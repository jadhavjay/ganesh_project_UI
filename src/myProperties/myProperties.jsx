import classes from "./myProperties.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../util/fetchAPI";
import React from "react";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";
// import person from "../../assets/person.jpg";
// import emailjs from "@emailjs/browser";
import { FaBed, FaSquareFull } from "react-icons/fa";
import { useRef } from "react";

const MyProperties = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [propertyDetails, setPropertyDetail] = useState([]);
  const [propertyDetailsTobeUpdated, setPropertyDetailTobeUpdated] = useState();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { id } = useParams();
  const formRef = useRef();
  const [state, setState] = useState({});

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const data = await request(`/property/getAll/${id}`, "GET", options);
        setPropertyDetail(data);
        console.log(setPropertyDetail(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [id]);
  const handleCloseForm = () => {
    setShowForm(false);
    setTitle("");
    setDesc("");
  };
  const deleteProperty = async (property) => {
    console.log(property);
    try {
      const options = {
        Authorization: `Bearer ${token}`,
      };
      const data = await request(
        `/property/delete/${property._id}`,
        "GET",
        options
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const updateProperty = async (e) => {
    e.preventDefault();
    console.log(formRef.current);
    // try {
    //   const options = {
    //     Authorization: `Bearer ${token}`
    //   };
    //   const data = await fetch(`/property/update/${property._id}`,{
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     body: JSON.stringify({ ...state  }),
    //   });
    //   console.log(data)
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div>
      {propertyDetails?.map((propertyDetail) => (
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <div className={classes.left}>
              <img
                src={`http://localhost:5000/images/${propertyDetail?.img}`}
              />
            </div>
            <div className={classes.right}>
              <h3 className={classes.title}>
                Title: {`${propertyDetail?.title}`}
              </h3>
              <div className={classes.details}>
                <div className={classes.typeAndContinent}>
                  <div>
                    Type: <span>{`${propertyDetail?.type}`}</span>
                  </div>
                  <div>
                    Continent: <span>{`${propertyDetail?.continent}`}</span>
                  </div>
                </div>
                <div className={classes.priceAndOwner}>
                  <span className={classes.price}>
                    <span>Price: $ </span>
                    {`${propertyDetail?.price}`}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    Owner:{" "}
                    <img
                      src={`http://localhost:5000/images/${propertyDetail?.img}`}
                      className={classes.owner}
                    />
                  </span>
                </div>
                <div className={classes.moreDetails}>
                  <span>
                    {propertyDetail?.beds} <FaBed className={classes.icon} />
                  </span>
                  <span>
                    {propertyDetail?.sqmeters} square meters{" "}
                    <FaSquareFull className={classes.icon} />
                  </span>
                </div>
              </div>
              <p className={classes.desc}>
                Desc: <span>{`${propertyDetail?.desc}`}</span>
              </p>
              <div>
                <button
                  onClick={() => deleteProperty(propertyDetail)}
                  className={classes.contactOwner}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setShowForm(true);
                    setPropertyDetailTobeUpdated(propertyDetail);
                  }}
                  className={classes.contactOwner}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          {showForm && (
            <div className={classes.contactForm} onClick={handleCloseForm}>
              <div
                className={classes.contactFormWrapper}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Send Email To Owner</h2>
                <form onSubmit={updateProperty} ref={formRef}>
                  <input
                    value={propertyDetailsTobeUpdated?.title}
                    type="text"
                    onChange={handleState}
                    placeholder="My email"
                    name="from_email"
                  />
                  <input
                    value={propertyDetailsTobeUpdated?.type}
                    type="text"
                    onChange={handleState}
                    placeholder="My username"
                    name="from_username"
                  />
                  <input
                    value={propertyDetail?.currentOwner?.email}
                    type="email"
                    placeholder="Owner email"
                    name="to_email"
                  />
                  <input
                    value={title}
                    type="text"
                    placeholder="Title"
                    name="from_title"
                    onChange={handleState}
                    autoComplete="off"
                  />
                  <input
                    value={desc}
                    type="text"
                    placeholder="Desc"
                    name="message"
                    onChange={handleState}
                    // onChange={(e) => setDesc(e.target.value)}
                    autoComplete="off"
                  />
                  <button>Send</button>
                </form>
                <AiOutlineClose
                  onClick={handleCloseForm}
                  className={classes.removeIcon}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyProperties;
