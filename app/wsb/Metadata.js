const Metadata = ({ title, description }) => {
  return (
    <head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
  )
}

export default Metadata
