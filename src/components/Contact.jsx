import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const SERVICE_ID  = "service_3ott184";
const TEMPLATE_ID = "template_44jldw7";
const PUBLIC_KEY  = "xBwmYxEHtcGKEdoWQ"; // EmailJS Public Key

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      .then(() => {
        alert("Thank you. I’ll get back to you as soon as possible.");
        formRef.current?.reset();
      })
      .catch((err) => {
        console.error("EmailJS error →", err, {
          status: err?.status,
          text: err?.text,
          message: err?.message,
          body: err?.response?.text,
        });
        alert(`Send failed (${err?.status || "?"}). Check console for details.`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black p-8 rounded-2xl"
      >
        <h3 className={styles.sectionHeadTextWhite}>Contact Me!</h3>
        <h4 className={styles.heroSubText}>Email: jacobchin.builds@gmail.com</h4>

        {/* IMPORTANT: names MUST match your EmailJS template variables */}
        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="user_name"  // <-- matches template var
              placeholder="What's your name?"
              className="bg-black py-4 px-6 placeholder:text-white text-white rounded-lg outline-none border-2 border-white font-medium"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="user_email"  // <-- matches template var
              placeholder="What's your email address?"
              className="bg-black py-4 px-6 placeholder:text-white text-white rounded-lg outline-none border-2 border-white font-medium"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"     // <-- matches template var
              placeholder="What would you like to say?"
              className="bg-black py-4 px-6 placeholder:text-white text-white rounded-lg outline-none border-2 border-white font-medium"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-black py-3 px-8 rounded-xl outline-none border-2 border-white w-fit text-white font-bold shadow-md shadow-primary disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
