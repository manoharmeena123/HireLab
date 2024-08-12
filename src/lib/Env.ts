export default class Env {
  static API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;
  static APP_URL: string = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
  static IMAGE_URL: string = process.env.NEXT_PUBLIC_IMAGE_URL as string;

  //firebase
  static REACT_APP_API_KEY: string = process.env.REACT_APP_API_KEY as string;
  static REACT_APP_AUTH_DOMAIN: string = process.env.REACT_APP_AUTH_DOMAIN as string;
  static REACT_APP_PROJECT_ID: string = process.env.REACT_APP_PROJECT_ID as string;
  static REACT_APP_STORAGE_BUCKET: string = process.env.REACT_APP_STORAGE_BUCKET as string;
  static REACT_APP_MESSAGING_SENDER_ID: string = process.env.REACT_APP_MESSAGING_SENDER_ID as string;
  static REACT_APP_APP_ID: string = process.env.REACT_APP_APP_ID as string;
  static REACT_APP_MEASUREMENT_ID: string = process.env.REACT_APP_MEASUREMENT_ID as string;
}
