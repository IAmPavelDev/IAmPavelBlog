export default async function postImage(imageFile: File): Promise<string> {
  return fetch(process.env.REACT_APP_SERVER_CONNECTION + "/images", {
    method: "POST",
    body: imageFile,
    credentials: "include",
  })
    .then((response) => response.json())
    .then((responseObj) => {
      if (responseObj.error) {
        throw new Error(responseObj.error);
      }
      return responseObj;
    })
    .then((imageId: string) => {
      return `${process.env.REACT_APP_SERVER_CONNECTION}/images/${imageId}`;
    })
    .catch(() => {
      console.error("can't post image on server");
      return "";
    });
}
