import "./index.css";
import exitIcon from "../../assets/exit.svg";
import { foodType } from "../../data";
import { dietOptions } from "../../data";
import React, { useState } from "react";
import Select from "react-select";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AddFoodPage({ exitPopup }) {
  const foodTypeOptions = foodType.map((option) => ({
    label: option,
    value: option,
  }));
  const dietSelectOptions = dietOptions.map((option) => ({
    label: option,
    value: option,
  }));
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    description: "",
  });
  const [expiry, setExpiry] = useState(new Date());
  const [types, setTypes] = useState(null);
  const [diet, setDiet] = useState(null);
  const [base64String, setBase64String] = useState("");
  const exit = () => {
    exitPopup(false);
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    console.log(value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Read the file as a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64String(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Next two lines convert multiselect to array,
    const typeArr = types.map((type) => type.value);
    const dietArr = diet.map((type) => type.value);

    // go back to all foods
    exitPopup(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup overflow-scroll">
        <div className="flex flex-row justify-between w-full">
          <div className="italic text-xl font-light">Add Your Food!</div>
          <img src={exitIcon} onClick={exit} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="onboard__form-container w-[92%]"
        >
          <div className="onboard__inputs">
            <div className="onboard__input-field">
              <label htmlFor="text">What is your food?</label>
              <input
                required
                type="text"
                name="name"
                value={formValues.name}
                placeholder="Food Name"
                onChange={handleChange}
                className="onboard__input bg-gray-100 "
              />
            </div>

            <div className="onboard__input-field">
              <label>Upload an image</label>
              <input
                required
                type="file"
                placeholder="Upload an Image"
                onChange={handleFileChange}
                className="onboard__input bg-gray-100"
              />
            </div>

            <div className="onboard__input-field">
              <label htmlFor="address">Address</label>
              <input
                required
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="onboard__input bg-gray-100 "
              />
            </div>
            <div className="onboard__input-field">
              <label htmlFor="address">Type</label>
              <Select
                isMulti
                name="type"
                options={foodTypeOptions}
                onChange={(choice) => {
                  setTypes(choice);
                }}
                className="my-4 bg-gray-100 basic-multi-select"
                classNamePrefix="select"
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "rgb(243 244 246 / var(--tw-bg-opacity))",
                    fontWeight: "400",
                  }),
                }}
              />
            </div>
            <div className="onboard__input-field">
              <label htmlFor="expiry" className="mr-2">
                Expiry
              </label>
              <DatePicker
                selected={expiry}
                onChange={(date) => setExpiry(date)}
                className="w-full"
              />
            </div>
            <div className="onboard__input-field">
              <label htmlFor="diet">Diet</label>
              <Select
                isMulti
                name="diet"
                options={dietSelectOptions}
                onChange={(choice) => {
                  setDiet(choice);
                }}
                className="my-4 bg-gray-100 basic-multi-select"
                classNamePrefix="select"
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "rgb(243 244 246 / var(--tw-bg-opacity))",
                    fontWeight: "400",
                  }),
                }}
              />
            </div>
            <div className="onboard__input-field">
              <label htmlFor="description">Description</label>
              <input
                required
                type="text"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                placeholder="Enter a description"
                className="onboard__input bg-gray-100 "
              />
            </div>
          </div>

          <button className="onboard__submit bg-gray-100 " type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
