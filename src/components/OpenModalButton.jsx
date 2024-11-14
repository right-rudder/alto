import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const OpenModalButton = ({ webhook_url }) => {
  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userName, setUserName] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
    setFormSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (formData.get("confirm-email")) {
      return;
    }

    const name = formData.get("name");
    setUserName(name);

    const url = webhook_url;
    fetch(url, {
      method: "POST",
      body: new URLSearchParams(formData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (response.ok) {
          setFormSubmitted(true);
        } else {
          console.error("Form submission failed:", response.statusText);
        }
      })
      .catch((error) => {
        console.error(
          "Network error occurred while submitting the form:",
          error,
        );
      });
  };

  return (
    <>
      <button className="btn-red" onClick={toggleModal}>
        Download the free guide
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-sm m-4 text-black relative rounded-md">
            {!formSubmitted && (
              <>
                <h2 className="text-2xl font-bold mb-4">Get the free guide</h2>
                <p className="mb-4">
                  Fill out the form below to get the free guide.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human:
                      <input name="confirm-email" />
                    </label>
                  </p>

                  <button
                    type="submit"
                    className="btn-red w-full hover:from-red-700 hover:to-red-900 hover:text-white"
                  >
                    Get the guide
                  </button>
                </form>
              </>
            )}

            {formSubmitted && (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Thank you, {userName}, for downloading our Quick Start Guide!
                </h2>
                <p className="mb-4">
                  You will receive an email with a download link shortly. Please
                  check your junk/spam folders if you do not receive anything
                  from us.
                </p>
              </>
            )}

            <button
              className="bg-red-600 p-1 rounded-full absolute top-2 right-2"
              onClick={toggleModal}
            >
              <IoMdClose className="text-2xl text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenModalButton;
