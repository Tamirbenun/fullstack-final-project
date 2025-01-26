import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  img?: string;
}

export const JwtDecodedID = (): string | null => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode<JwtPayload>(token || "");
    return decoded.jti || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const JwtDecodedUserName = (): string | null => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode<JwtPayload>(token || "");
    return decoded.sub || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const JwtDecodedUserImage = () => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode<CustomJwtPayload>(token || "");
    return decoded.img || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { JwtDecodedID, JwtDecodedUserName, JwtDecodedUserImage };
