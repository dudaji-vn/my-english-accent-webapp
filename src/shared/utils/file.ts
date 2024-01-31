export function convertBase64toFile(base64String: string, fileName: string, mimeType?: string) {
  if (base64String.startsWith("data:")) {
    const arr = base64String.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
    const bstr = atob(arr[arr.length - 1]);

    let n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], fileName, { type: mime || mimeType });
    return Promise.resolve(file);
  }

  return fetch(base64String)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], fileName, { type: mimeType ?? "application/octet-stream" }));
}
