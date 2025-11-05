import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "./shared/TextField";
import SelectField from "./shared/SelectField";
import TextArea from "./shared/TextArea";
import UserCard from "./shared/UserCard";
import { apiPaths, appApi } from "../utils/api";
import { addUser, removeUser } from "../utils/userSlice";
import useToast from "../utils/useToast";
import FileInput from "./shared/FileInput";
import { convertFormData } from "../utils/formData";

const genderValues = [
  {
    label: "Male",
    value: "male",
  },
  { label: "Female", value: "female" },
  { label: "Others", value: "others" },
];

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [editFields, setEditFields] = useState({});
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handleChange = (e) => {
    let { name, value, type, files } = e.target;
    if (type === "file" && files && files[0]) {
      value = files[0];
    }
    setEditFields({ ...editFields, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await appApi.patch(
        apiPaths.updateProfile,
        convertFormData(editFields)
      );
      showToast(data?.message);
      setError("");
      window.location.reload();
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      setEditFields({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        gender: user.gender || "",
        profileUrl: user.profileUrl || "",
        about: user.about || "",
      });
    }
  }, [user]);

  return (
    <div className="h-full flex justify-center items-center gap-8 pt-5">
      <div className="h-max card bg-base-100 w-96 shadow-sm">
        <div className="card-body flex-col items-center">
          <h2 className="card-title font-medium text-2xl">Edit Profile</h2>
          <TextField
            name="firstName"
            label="First Name"
            onChange={handleChange}
            value={editFields.firstName}
          />
          <TextField
            name="lastName"
            label="Last Name"
            onChange={handleChange}
            value={editFields.lastName}
          />
          <TextField
            name="age"
            label="Age"
            onChange={handleChange}
            value={editFields.age}
          />
          <SelectField
            label="Gender "
            name="gender"
            value={editFields.gender}
            onChange={handleChange}
            options={genderValues}
            selectLabel="Select Gender"
          />
          <TextField
            name="profileUrl"
            label="Profile Url"
            onChange={handleChange}
            value={
              typeof editFields.profileUrl === "object"
                ? URL.createObjectURL(editFields.profileUrl)
                : editFields.profileUrl
            }
          />
          <FileInput
            name="profileUrl"
            label="Profile Image"
            onChange={handleChange}
            value={editFields.profileUrl}
          />
          <TextArea
            name="about"
            label="About"
            onChange={handleChange}
            value={editFields.about}
          />

          {error && <p className="self-start text-red-500">{error}</p>}
          <div className="card-actions self-end mr-4.5">
            {editFields.profileUrl && (
              <button
                className="btn btn-error"
                onClick={() =>
                  setEditFields((prev) => ({ ...prev, profileUrl: "" }))
                }
              >
                Remove Profile Image
              </button>
            )}
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard user={editFields} disableActions />
    </div>
  );
};
export default Profile;
