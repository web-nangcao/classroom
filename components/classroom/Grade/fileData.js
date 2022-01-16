export default function FileData({ selectedFile }) {
  if (selectedFile) {
    return (
      <div>
        <h2>File Details:</h2>

        <p>File Name: {selectedFile.name}</p>

        <p>File Type: {selectedFile.type}</p>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <h4>Choose before Pressing the Upload button</h4>
      </div>
    );
  }
}
