import { useState, useEffect } from "react";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import styles from "./AddAnnouncementForm.module.css";
import { Button } from "../Button/Button";
import ReactSelect from "react-select";
import { mainStyles } from "../../helpers/stylesSelect";
import { useNavigate } from "react-router-dom";

export const AddAnnouncementForm = ({ announcementData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    announcementtype: announcementData?.announcementtype || "",
    propertytype: announcementData?.propertytype || "",
    address: announcementData?.address || "",
    city: announcementData?.cityname || "",
    description: announcementData?.description || "",
    price: announcementData?.price || "",
    area: announcementData?.area || "",
    numberOfRooms: announcementData?.numberofrooms || "",
    propertyFloor: announcementData?.property_floor || "",
    baths: announcementData?.baths || "",
    beds: announcementData?.beds || "",
  });

  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [dealTypeOptions, setDealTypeOptions] = useState([]);
  const [propTypeOptions, setPropTypeOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedAnnouncementType, setSelectedAnnouncementType] =
    useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (announcementData) {
      setFormData({
        announcementtype: announcementData.announcementtype || "",
        propertytype: announcementData.propertytype || "",
        address: announcementData.address || "",
        city: announcementData.cityname || "",
        description: announcementData.description || "",
        price: announcementData.price || "",
        area: announcementData.area || "",
        numberOfRooms: announcementData?.numberofrooms || "",
        propertyFloor: announcementData?.property_floor || "",
        baths: announcementData.baths || "",
        beds: announcementData.beds || "",
      });
      setSelectedCity(
        cities.find((city) => city.label === announcementData.cityname) || null
      );
      setSelectedAnnouncementType(
        dealTypeOptions.find(
          (option) => option.label === announcementData.announcementtype
        ) || null
      );
      setSelectedPropertyType(
        propTypeOptions.find(
          (option) => option.label === announcementData.propertytype
        ) || null
      );
      setExistingImageUrls(announcementData.images || []);
    }
  }, [announcementData, cities, dealTypeOptions, propTypeOptions]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityResponse = await axios.get("http://localhost:3000/cities");
        const cityOptions = cityResponse.data.map((city) => ({
          value: city.cityname,
          label: city.cityname,
        }));
        setCities(cityOptions);

        const dealTypeResponse = await axios.get(
          "http://localhost:3000/deal-types"
        );
        const dealTypeOptions = dealTypeResponse.data.map((type) => ({
          value: type.typename,
          label: type.typename,
        }));
        setDealTypeOptions(dealTypeOptions);

        const propTypeResponse = await axios.get(
          "http://localhost:3000/property-types"
        );
        const propTypeOptions = propTypeResponse.data.map((type) => ({
          value: type.typename,
          label: type.typename,
        }));
        setPropTypeOptions(propTypeOptions);
      } catch (error) {
        Notify.failure("Помилка при завантаженні даних");
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();

    const newErrors = {};
    if (!formData.announcementtype) {
      newErrors.announcementtype = "Тип оголошення є обов'язковим";
    }
    if (!formData.propertytype) {
      newErrors.propertytype = "Тип нерухомості є обов'язковим";
    }
    if (!formData.address) {
      newErrors.address = "Адреса є обов'язковою";
    }
    if (!formData.city) {
      newErrors.city = "Місто є обов'язковим";
    }
    if (!formData.description) {
      newErrors.description = "Опис є обов'язковим";
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Ціна повинна бути додатнім числом";
    }
    if (imageFiles.length === 0 && existingImageUrls.length === 0) {
      newErrors.images = "Завантажте хоча б одне зображення";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.post(
              "https://api.imgbb.com/1/upload?key=90620ffdb6fee7a358ac29929d687478",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            return response.data.data.url;
          } catch (error) {
            console.error("Error uploading image", error);
            Notify.failure("Помилка при завантаженні зображення");
          }
        })
      );

      const url = announcementData
        ? `http://localhost:3000/announcements/${announcementData.announcement_id}`
        : "http://localhost:3000/announcements";
      const method = announcementData ? "put" : "post";

      const response = await axios[method](
        url,
        {
          ...formData,
          imageUrls: [...existingImageUrls, ...imageUrls],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Notify.success(
        `Оголошення успішно ${announcementData ? "оновлено" : "додано"}`
      );
      onSave(response.data);
      onClose();
      navigate("/profile");
    } catch (error) {
      Notify.failure(
        `Помилка при ${announcementData ? "оновленні" : "додаванні"} оголошення`
      );
      console.error(
        `Error ${announcementData ? "updating" : "adding"} announcement`,
        error
      );
    }
  };

  const handleInputValue = (evt) => {
    setSelectedAnnouncementType(evt);
    setFormData((prevData) => ({ ...prevData, announcementtype: evt.value }));
  };

  const handlePropTypeValue = (evt) => {
    setSelectedPropertyType(evt);
    setFormData((prevData) => ({
      ...prevData,
      propertytype: evt ? evt.value : "",
    }));
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      city: selectedOption ? selectedOption.label : "",
    }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };

  const handleDeleteImage = (index) => {
    setImageFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleDeleteExistingImage = (index) => {
    setExistingImageUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.wrapper}>
        <div className={styles.form__wrap}>
          <div className={styles.field}>
            <label htmlFor="deal_type">Тип оголошення</label>
            <div
              className={`${
                errors.announcementtype ? styles.invalidSelect : ""
              }`}
            >
              <ReactSelect
                isSearchable={false}
                value={selectedAnnouncementType}
                onChange={handleInputValue}
                name="deal_type"
                placeholder="Тип оголошення"
                options={dealTypeOptions}
                styles={mainStyles}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="prop_type">Тип нерухомості</label>
            <div
              className={`${errors.propertytype ? styles.invalidSelect : ""}`}
            >
              <ReactSelect
                isSearchable={false}
                placeholder="Тип нерухомості"
                value={selectedPropertyType}
                onChange={handlePropTypeValue}
                name="prop_type"
                options={propTypeOptions}
                styles={mainStyles}
              />
            </div>
          </div>
          <div
            className={`${styles.field} ${
              errors.address ? styles.invalid : ""
            }`}
          >
            <label htmlFor="address">Адреса</label>
            <input
              name="address"
              id="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="city">Місто</label>
            <div className={`${errors.city ? styles.invalidSelect : ""}`}>
              <ReactSelect
                isSearchable={true}
                placeholder="Оберіть місто"
                value={selectedCity}
                onChange={handleCityChange}
                options={cities}
                styles={mainStyles}
              />
            </div>
          </div>
        </div>
        <div className={styles.form__wrap}>
          <div
            className={`${styles.field} ${errors.price ? styles.invalid : ""}`}
          >
            <label htmlFor="price">Ціна</label>
            <input
              name="price"
              id="price"
              type="text"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`${styles.field} ${errors.area ? styles.invalid : ""}`}
          >
            <label htmlFor="area">Площа</label>
            <input
              name="area"
              id="area"
              type="text"
              value={formData.area}
              onChange={handleInputChange}
            />
          </div>

          <div
            className={`${styles.field} ${
              errors.numberOfRooms ? styles.invalid : ""
            }`}
          >
            <label htmlFor="numberOfRooms">Кількість кімнат</label>
            <input
              name="numberOfRooms"
              id="numberOfRooms"
              type="text"
              value={formData.numberOfRooms}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`${styles.field} ${
              errors.propertyFloor ? styles.invalid : ""
            }`}
          >
            <label htmlFor="propertyFloor">Поверх</label>
            <input
              name="propertyFloor"
              id="propertyFloor"
              type="text"
              value={formData.propertyFloor}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.form__wrap}>
          <div
            className={`${styles.field} ${errors.baths ? styles.invalid : ""}`}
          >
            <label htmlFor="baths">Кількість ванних кімнат</label>
            <input
              name="baths"
              id="baths"
              type="text"
              value={formData.baths}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`${styles.field} ${errors.beds ? styles.invalid : ""}`}
          >
            <label htmlFor="beds">Кількість спальних місць</label>
            <input
              name="beds"
              id="beds"
              type="text"
              value={formData.beds}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`${styles.field} ${
              errors.description ? styles.invalid : ""
            }`}
          >
            <label htmlFor="description">Опис</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="image" className={styles.imageLabel}>
            Зображення
          </label>
          <div className={styles.customFileInput}>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className={styles.imageInput}
            />
            <label htmlFor="image" className={styles.customInputLabel}>
              Завантажити зображення
            </label>
          </div>

          <div className={styles.uploadedImages}>
            {existingImageUrls.length > 0 && (
              <>
                {existingImageUrls.map((url, index) => (
                  <div key={index} className={styles.uploadedImageWrapper}>
                    <div
                      className={styles.uploadedImage}
                      style={{
                        backgroundImage: `url('${url}')`,
                      }}
                    ></div>
                    <button
                      type="button"
                      className={styles.deleteImageButton}
                      onClick={() => handleDeleteExistingImage(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </>
            )}
            {imageFiles.length > 0 && (
              <>
                {imageFiles.map((file, index) => (
                  <div key={index} className={styles.uploadedImageWrapper}>
                    <div
                      className={styles.uploadedImage}
                      style={{
                        backgroundImage: `url('${URL.createObjectURL(file)}')`,
                      }}
                    ></div>
                    <button
                      type="button"
                      className={styles.deleteImageButton}
                      onClick={() => handleDeleteImage(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
          {errors.images && <p className={styles.error}>{errors.images}</p>}
        </div>
      </div>
      <Button type="submit" className={styles.btn}>
        {`${announcementData ? "Оновити" : "Додати"}`}
      </Button>
    </form>
  );
};
