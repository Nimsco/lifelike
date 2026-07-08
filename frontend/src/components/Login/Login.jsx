import React from "react";

const Login = () => {
    // Simple navigation handler
    const navigateTo = (e, path) => {
        e.preventDefault();
        window.history.pushState({}, "", path);
        window.dispatchEvent(new PopStateEvent("popstate"));
    };

    return (
        <div className="min-h-screen bg-page flex items-center justify-center p-4">
            <div className="w-full max-w-[900px] flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {/* ── Left: Branding ─────────────────────────────────────────── */}
                <div className="flex flex-col items-center text-center lg:flex-1 pb-6 lg:pb-0">
                    <p className="text-lg lg:text-xl text-heading font-normal max-w-[400px] mb-3">
                        Connect with friends and the world around you on
                        Lifelike.
                    </p>
                    <img
                        src="/logo.svg"
                        alt="Lifelike"
                        className="w-72 lg:w-96"
                        draggable={false}
                    />
                </div>

                {/* ── Right: Login Card ──────────────────────────────────────── */}
                <div className="w-full max-w-sm">
                    <div className="bg-card rounded-lg shadow-lg border border-border p-5 pb-6">
                        {/* Form */}
                        <div className="flex flex-col gap-4">
                            <div className="float-label">
                                <input
                                    id="login-identifier"
                                    type="text"
                                    placeholder=" "
                                />
                                <label htmlFor="login-identifier">
                                    Username or email
                                </label>
                            </div>

                            <div className="float-label">
                                <input
                                    id="login-password"
                                    type="password"
                                    placeholder=" "
                                />
                                <label htmlFor="login-password">Password</label>
                            </div>

                            {/* Login button */}
                            <button
                                id="login-submit-btn"
                                type="button"
                                className="w-full py-3 mt-2 bg-primary text-white font-bold text-[15px] rounded-md hover:bg-primary-hover transition-colors cursor-pointer shadow-sm"
                            >
                                Log In
                            </button>

                            {/* Forgot password & Remember Me */}
                            <div className="flex items-center justify-between mt-1">
                                <label
                                    htmlFor="login-remember"
                                    className="flex items-center gap-2 cursor-pointer select-none"
                                >
                                    <input
                                        type="checkbox"
                                        id="login-remember"
                                        className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                                    />
                                    <span className="text-sm text-muted">
                                        Remember me
                                    </span>
                                </label>

                                <a
                                    href="/forgot-password"
                                    id="login-forgot-password"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-border" />
                            <span className="text-xs text-muted font-medium uppercase">
                                or
                            </span>
                            <div className="flex-1 h-px bg-border" />
                        </div>

                        {/* Google button */}
                        <button
                            id="login-google-btn"
                            type="button"
                            className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-border bg-input-bg rounded-md text-sm font-medium text-heading hover:bg-page transition-colors cursor-pointer"
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
                    </div>

                    {/* Register link block */}
                    <div className="bg-card rounded-lg shadow-lg border border-border p-5 mt-4 text-center">
                        <p className="text-sm text-body">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                onClick={(e) => navigateTo(e, "/register")}
                                id="login-goto-register"
                                className="text-primary font-semibold hover:underline"
                            >
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
