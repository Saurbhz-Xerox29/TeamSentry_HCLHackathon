// src/pages/DoctorModule/DoctorSignUp.jsx
import React, { useEffect, useState } from "react";
import userIcon from "../../assets/img/user.svg";
import emailIcon from "../../assets/img/email.svg";
import passwordIcon from "../../assets/img/password.svg";
import styles from "../LoginModule/SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { notify } from "../../utils/toast";
import { Link, useNavigate } from "react-router-dom";
import { doctorApi } from "../../api/doctor.api";
import { validate } from "../../utils/validate";

const DoctorSignUp = () => {
  const navigate = useNavigate();

  // DoctorProfile fields are: IsApproved, CreatedAtUtc, ApprovedAtUtc, LicenseFileName, LicenseFilePath, LicenseUploadedAtUtc :contentReference[oaicite:0]{index=0}
  // From UI we will only collect: licenseFile (to populate LicenseFileName/Path/UploadedAt on backend).
  // IsApproved/ApprovedAtUtc/CreatedAtUtc should be set by backend.

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    licenseFile: null, // maps to DoctorProfile LicenseFileName/Path/UploadedAtUtc after upload :contentReference[oaicite:1]{index=1}
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrors(validate(data, "doctorSignUp"));
  }, [data, touched]);

  const changeHandler = (event) => {
    const { name, type, value, checked, files } = event.target;

    if (type === "checkbox") {
      setData({ ...data, [name]: checked });
    } else if (type === "file") {
      setData({ ...data, [name]: files?.[0] || null });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (Object.keys(errors).length) {
      notify("Please check fields again", "error");
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        licenseFile: true,
        IsAccepted: true,
      });
      return;
    }

    try {
      setLoading(true);

      // multipart so license file can be uploaded
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("email", data.email.trim().toLowerCase());
      formData.append("password", data.password);
      formData.append("role", "Doctor");
      formData.append("licenseFile", data.licenseFile);

      await doctorApi.register(formData);

      notify("Doctor registered successfully. Awaiting admin approval.", "success");
      navigate("/login");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Doctor registration failed";
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>Doctor Sign Up</h2>

        {/* Name */}
        <div>
          <div className={errors.name && touched.name ? styles.unCompleted : !errors.name && touched.name ? styles.completed : undefined}>
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Name"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={userIcon} alt="" />
          </div>
          {errors.name && touched.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        {/* Email */}
        <div>
          <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="E-mail"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={emailIcon} alt="" />
          </div>
          {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        {/* Password */}
        <div>
          <div className={errors.password && touched.password ? styles.unCompleted : !errors.password && touched.password ? styles.completed : undefined}>
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div>
          <div className={errors.confirmPassword && touched.confirmPassword ? styles.unCompleted : !errors.confirmPassword && touched.confirmPassword ? styles.completed : undefined}>
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder="Confirm Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>

        {/* License Upload (DoctorProfile LicenseFileName/LicenseFilePath/LicenseUploadedAtUtc) :contentReference[oaicite:2]{index=2} */}
        <div>
          <div className={errors.licenseFile && touched.licenseFile ? styles.unCompleted : !errors.licenseFile && touched.licenseFile ? styles.completed : undefined}>
            <label
                htmlFor="licenseFile"
                style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#334155",
                    marginBottom: "8px",
                }}
                >
                Upload Medical License <span style={{ color: "#ef4444" }}>*</span>
                <span
                    style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 400,
                    color: "#64748b",
                    marginTop: "4px",
                    }}
                >
                    Accepted: PDF, JPG, PNG (max 5MB)
                </span>
                </label>
            <input
              type="file"
              name="licenseFile"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
          </div>
          {errors.licenseFile && touched.licenseFile && (
            <span className={styles.error}>{errors.licenseFile}</span>
          )}
        </div>

        {/* Terms */}
        <div>
          <div className={styles.terms}>
            <input
              type="checkbox"
              name="IsAccepted"
              checked={data.IsAccepted}
              id="accept"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <label htmlFor="accept">I accept terms of privacy policy</label>
          </div>
          {errors.IsAccepted && touched.IsAccepted && <span className={styles.error}>{errors.IsAccepted}</span>}
        </div>

        {/* Submit */}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Doctor Account"}
          </button>

          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Already have an account? <Link to="/login">Sign In</Link>
          </span>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default DoctorSignUp;
