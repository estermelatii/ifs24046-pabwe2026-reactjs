import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../hooks/useInput";
import {
  asyncSetIsAuthRegister,
  setIsAuthRegisterActionCreator,
} from "../states/action";
import {
  IconUser,
  IconMail,
  IconLock,
  IconLoader2,
  IconUserPlus,
} from "@tabler/icons-react";

function RegisterPage() {
  const dispatch = useDispatch();
  const isAuthRegister = useSelector((state) => state.isAuthRegister);

  const [loading, setLoading] = useState(false);
  const [name, onChangeName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (isAuthRegister) {
      setLoading(false);
      dispatch(setIsAuthRegisterActionCreator(false));
    }
  }, [isAuthRegister, dispatch]);

  function onSubmitHandler(event) {
    event.preventDefault();
    setLoading(true);
    dispatch(asyncSetIsAuthRegister(name, email, password));
  }

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4" aria-label="Form registrasi">
      <div>
        <label
          htmlFor="register-name-input"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Nama Lengkap
        </label>
        <div className="relative">
          <IconUser
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
            aria-hidden="true"
          />
          <input
            type="text"
            id="register-name-input"
            data-testid="register-name-input"
            value={name}
            onChange={onChangeName}
            placeholder="Nama lengkap"
            autoComplete="name"
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="register-email-input"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Alamat Email
        </label>
        <div className="relative">
          <IconMail
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
            aria-hidden="true"
          />
          <input
            type="email"
            id="register-email-input"
            data-testid="register-email-input"
            value={email}
            onChange={onChangeEmail}
            placeholder="nama@email.com"
            autoComplete="email"
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="register-password-input"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Kata Sandi
        </label>
        <div className="relative">
          <IconLock
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
            aria-hidden="true"
          />
          <input
            type="password"
            id="register-password-input"
            data-testid="register-password-input"
            value={password}
            onChange={onChangePassword}
            placeholder="Minimal 6 karakter"
            autoComplete="new-password"
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            required
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          data-testid="register-submit-button"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 rounded-xl shadow-md shadow-indigo-600/25 transition-all disabled:opacity-60"
        >
          {loading ? (
            <>
              <IconLoader2 size={18} className="animate-spin" aria-hidden="true" />
              <span>Mendaftarkan Akun...</span>
            </>
          ) : (
            <>
              <IconUserPlus size={18} stroke={2.5} aria-hidden="true" />
              <span>Daftar Akun</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default RegisterPage;
