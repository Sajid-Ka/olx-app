import { Modal, ModalBody } from "flowbite-react";
import React, { useState } from "react";
import Input from "../Input/Input";
import { UserAuth } from "../Context/Auth";
import { addDoc, collection } from "firebase/firestore";
import { fetchFromFirestore, fireStore } from "../Firebase/Firebase";
import fileUpload from "../../assets/fileUpload.svg";
import loading from "../../assets/loading.gif";
import close from "../../assets/close.svg";

const Sell = ({ toggleModalSell, status, setItems }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const auth = UserAuth();

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

    if (!trimmedTitle || !trimmedCategory || !price || !trimmedDescription || !image) {
      alert("All fields are required, including an image");
      setSubmitting(false);
      return;
    }

    try {
  
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
      const imageUrl = data.secure_url; 

      
      await addDoc(collection(fireStore, "Products"), {
        title: trimmedTitle,
        category: trimmedCategory,
        price: parsedPrice,
        description: trimmedDescription,
        imageUrl,
        userId: auth.user.uid,
        userName: auth.user.displayName || "Anonymous",
        createAt: new Date().toDateString(),
      });

      
      const datas = await fetchFromFirestore();
      setItems(datas);

      
      setImage(null);
      setTitle("");
      setCategory("");
      setPrice("");
      setDescription("");
      toggleModalSell();
    } catch (error) {
      console.error("Error adding item: ", error);
      alert("Failed to add item. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <p className="font-bold text-lg mb-3">Sell Item</p>

            <form onSubmit={handleSubmit}>
              <Input setInput={setTitle} placeholder="Title" />
              <Input setInput={setCategory} placeholder="Category" />
              <Input setInput={setPrice} placeholder="Price" type="number" />
              <Input setInput={setDescription} placeholder="Description" />

              <div>
                {image ? (
                  <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                    <img className="object-contain" src={URL.createObjectURL(image)} alt="" />
                  </div>
                ) : (
                  <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                      required
                    />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                      <img className="w-12" src={fileUpload} alt="" />
                      <p className="text-center text-sm pt-2">Click to upload images</p>
                      <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                    </div>
                  </div>
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
                      Sell Item
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