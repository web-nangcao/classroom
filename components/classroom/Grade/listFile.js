export default function FileData({ files }) {
  if (files) {
    return (
      <ul>
        {files.map((name) => {
          const href = `${process.env.API}${name}`
          return (
            <li key={name}>
              <a href={href}>{name}</a>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return <ul></ul>
  }
}
