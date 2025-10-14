import { Modal, ModalBody } from "flowbite-react";
import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import { UserAuth } from "../Context/Auth";
import { addDoc, collection } from "firebase/firestore";
import { fetchFromFirestore, fireStore, updateProduct } from "../Firebase/Firebase";
import fileUpload from "../../assets/fileUpload.svg";
import loading from "../../assets/loading.gif";
import close from "../../assets/close.svg";

const Sell = ({ toggleModalSell, status, setItems, editItem }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const auth = UserAuth();
  const isEditMode = !!editItem;

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || "");
      setCategory(editItem.category || "");
      setPrice(editItem.price?.toString() || "");
      setDescription(editItem.description || "");
      setImage(null); 
    } else {
      setTitle("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImage(null);
    }
  }, [editItem]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Image size exceeds 5MB. Please choose a smaller image.");
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth?.user) {
      alert("Please Login to continue");
      return;
    }

    setSubmitting(true);

    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const parsedPrice = parseFloat(price);
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedCategory || !price || !trimmedDescription) {
      alert("All fields are required");
      setSubmitting(false);
      return;
    }

    let imageUrl = isEditMode ? editItem.imageUrl : null;

    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "olx_clone_upload");
        formData.append("cloud_name", "dy23pysw6");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dy23pysw6/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const data = await response.json();
        imageUrl = data.secure_url;
      } else if (!isEditMode) {
        alert("Image is required for new products");
        setSubmitting(false);
        return;
      }

      const productData = {
        title: trimmedTitle,
        category: trimmedCategory,
        price: parsedPrice,
        description: trimmedDescription,
        imageUrl,
        userId: auth.user.uid,
        userName: auth.user.displayName || "Anonymous",
        createAt: isEditMode ? editItem.createAt : new Date().toDateString(),
      };

      if (isEditMode) {
        const success = await updateProduct(editItem.id, productData);
        if (!success) throw new Error("Failed to update product");
      } else {
        await addDoc(collection(fireStore, "Products"), productData);
      }

      const datas = await fetchFromFirestore();
      setItems(datas);

      setImage(null);
      setTitle("");
      setCategory("");
      setPrice("");
      setDescription("");
      toggleModalSell();
    } catch (error) {
      console.error("Error saving product: ", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const showImagePreview = image || (isEditMode && editItem?.imageUrl);

  return (
    <div>
      <Modal
        theme={{
          content: {
            base: "relative w-full p-4 md:h-auto",
            inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
          },
        }}
        onClick={toggleModalSell}
        show={status}
        className="bg-black"
        position={"center"}
        size="md"
        popup={true}
      >
        <ModalBody className="bg-white h-auto p-0 rounded-md" onClick={(e) => e.stopPropagation()}>
          <img
            onClick={() => {
              toggleModalSell();
              setImage(null);
            }}
            src={close}
            className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
          />
          <div className="p-6 pl-8 pr-8 pb-8">
            <p className="font-bold text-lg mb-3">{isEditMode ? "Edit Item" : "Sell Item"}</p>
            <form onSubmit={handleSubmit}>
              <Input setInput={setTitle} placeholder="Title" value={title} />
              <Input setInput={setCategory} placeholder="Category" value={category} />
              <Input setInput={setPrice} placeholder="Price" type="number" value={price} />
              <Input setInput={setDescription} placeholder="Description" value={description} />

              <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md overflow-hidden">
                {showImagePreview ? (
                  <>
                    <img
                      className="object-contain h-full w-full"
                      src={image ? URL.createObjectURL(image) : editItem?.imageUrl}
                      alt="Preview"
                    />
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <p className="text-white text-sm">Click to replace image</p>
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                      required={!isEditMode}
                    />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                      <img className="w-12" src={fileUpload} alt="" />
                      <p className="text-center text-sm pt-2">Click to upload images</p>
                      <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                    </div>
                  </>
                )}
              </div>

              <div>
                {submitting ? (
                  <div className="w-full flex h-14 justify-center pt-4 pb-2">
                    <img className="w-32 object-cover" src={loading} alt="" />
                  </div>
                ) : (
                  <div className="w-full pt-2">
                    <button
                      className="w-full p-3 rounded-lg text-white"
                      style={{ backgroundColor: "#002f34" }}
                      type="submit"
                    >
                      {isEditMode ? "Update Item" : "Sell Item"}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Sell;