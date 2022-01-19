export default function FileData({ selectedFile }) {
  if (selectedFile) {
    return (
      <div>
        <p>File Name: {selectedFile.name}</p>
      </div>
    );
  } 
}
