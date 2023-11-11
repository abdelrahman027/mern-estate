/* eslint-disable react/prop-types */
/** @format */

import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
    const [owner, setOwner] = useState(null);
    const [message, setMessage] = useState("");

    const fetchUser = async () => {
        try
        {
            const { userRef } = listing;
            const res = await fetch(`/api/user/${userRef}`);
            const userData = await res.json();
            setOwner(userData);
        } catch (error)
        {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Fragment>
            {owner && (
                <div>
                    <p>
                        Contact{" "}
                        <span className="text-lg font-semibold">{owner.username}</span>{" "}
                        Asking about{" "}
                        <span className="text-xl font-semibold">{listing.name}</span>
                    </p>
                    <textarea
                        name=""
                        id=""
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border p-3 rounded-lg my-4"
                        placeholder="Enter message here"
                    ></textarea>
                    <Link
                        to={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${message}`}
                        className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </Fragment>
    );
};

export default Contact;
