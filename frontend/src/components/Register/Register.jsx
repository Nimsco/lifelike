import React from "react";

const Register = () => {
    // Simple navigation handler
    const navigateTo = (e, path) => {
        e.preventDefault();
        window.history.pushState({}, "", path);
        window.dispatchEvent(new PopStateEvent("popstate"));
    };

    return (
        <div className="min-h-screen bg-page flex items-center justify-center p-4 py-10">
            <div className="w-full max-w-[1000px] flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {/* ── Left: Branding ─────────────────────────────────────────── */}
                <div className="flex flex-col items-center text-center lg:flex-1 lg:self-start lg:pt-16">
                    <p className="text-lg lg:text-xl text-heading font-normal max-w-[400px] mb-3">
                        Create an account to start sharing your moments with the
                        world.
                    </p>
                    <img
                        src="/logo.svg"
                        alt="Lifelike"
                        className="w-72 lg:w-96"
                        draggable={false}
                    />
                </div>

                {/* ── Right: Register Card ───────────────────────────────────── */}
                <div className="w-full max-w-lg">
                    <div className="bg-card rounded-lg shadow-lg border border-border p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-heading text-center mb-1">
                            Create a new account
                        </h2>
                        <p className="text-sm text-muted text-center mb-6">
                            It's quick and easy.
                        </p>

                        <div className="h-px bg-border mb-6" />

                        <div className="flex flex-col gap-5">
                            {/* Google button (Moved Upwards) */}
                            <button
                                id="register-google-btn"
                                type="button"
                                className="w-full flex items-center justify-center gap-2.5 py-3 border border-border bg-input-bg rounded-md text-sm font-medium text-heading hover:bg-page transition-colors cursor-pointer"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09a7.07 7.07 0 0 1 0-4.18V7.07H2.18A11.99 11.99 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-1">
                                <div className="flex-1 h-px bg-border" />
                                <span className="text-xs text-muted font-medium uppercase">
                                    or register with email
                                </span>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            {/* Avatar upload */}
                            <div>
                                <label className="block text-xs font-medium text-heading mb-1.5 ml-1">
                                    Avatar
                                </label>
                                <div
                                    id="register-avatar-upload"
                                    className="flex items-center gap-4 p-3.5 border border-dashed border-border rounded-md cursor-pointer hover:border-primary transition-colors bg-input-bg"
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center flex-shrink-0">
                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#8e8e8e"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-heading">
                                            Upload avatar
                                        </p>
                                        <p className="text-xs text-muted">
                                            JPG, PNG or GIF. Max 5MB.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="float-label">
                                <input
                                    id="register-email"
                                    type="email"
                                    placeholder=" "
                                />
                                <label htmlFor="register-email">
                                    Email address
                                </label>
                            </div>

                            {/* Username */}
                            <div className="float-label">
                                <input
                                    id="register-username"
                                    type="text"
                                    placeholder=" "
                                />
                                <label htmlFor="register-username">
                                    Username
                                </label>
                            </div>

                            {/* Password row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="float-label">
                                    <input
                                        id="register-password"
                                        type="password"
                                        placeholder=" "
                                    />
                                    <label htmlFor="register-password">
                                        Password
                                    </label>
                                </div>
                                <div className="float-label">
                                    <input
                                        id="register-confirm-password"
                                        type="password"
                                        placeholder=" "
                                    />
                                    <label htmlFor="register-confirm-password">
                                        Confirm password
                                    </label>
                                </div>
                            </div>

                            {/* Date of Birth + Gender row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="float-label-static">
                                    <input id="register-dob" type="date" />
                                    <label htmlFor="register-dob">
                                        Date of Birth
                                    </label>
                                </div>
                                <div className="float-label-static">
                                    <select
                                        id="register-gender"
                                        defaultValue="male"
                                    >
                                        <option
                                            value=""
                                            disabled
                                            hidden
                                        ></option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="non-binary">
                                            Non-binary
                                        </option>
                                        <option value="prefer-not-to-say">
                                            Prefer not to say
                                        </option>
                                        <option value="other">Other</option>
                                    </select>
                                    <label htmlFor="register-gender">
                                        Gender
                                    </label>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="float-label">
                                <textarea
                                    id="register-bio"
                                    placeholder=" "
                                    rows={2}
                                />
                                <label htmlFor="register-bio">
                                    Bio (optional)
                                </label>
                            </div>

                            {/* Terms */}
                            <p className="text-[11px] text-muted leading-relaxed mt-2 text-center">
                                By clicking Sign Up, you agree to our{" "}
                                <a
                                    href="/terms"
                                    className="text-primary hover:underline"
                                >
                                    Terms
                                </a>
                                ,{" "}
                                <a
                                    href="/privacy"
                                    className="text-primary hover:underline"
                                >
                                    Privacy Policy
                                </a>{" "}
                                and{" "}
                                <a
                                    href="/cookies"
                                    className="text-primary hover:underline"
                                >
                                    Cookies Policy
                                </a>
                                .
                            </p>

                            {/* Register button */}
                            <button
                                id="register-submit-btn"
                                type="button"
                                className="w-full py-3.5 mt-1 bg-primary text-white font-bold text-[15px] rounded-md hover:bg-primary-hover transition-colors cursor-pointer shadow-sm"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div className="bg-card rounded-lg shadow-lg border border-border p-5 mt-4 text-center">
                        <p className="text-sm text-body">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                onClick={(e) => navigateTo(e, "/login")}
                                id="register-goto-login"
                                className="text-primary font-semibold hover:underline"
                            >
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
