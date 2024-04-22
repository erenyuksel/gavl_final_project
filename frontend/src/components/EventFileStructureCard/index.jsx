
const EventFileStructureCard = ({ file }) => {
  

    
  return (
    <>
      <div className="flex flex-col">
        <span>Field name: {file.name}</span>
        <span>Field type: {file.type}</span>
      </div>
    </>
  )

}

export default EventFileStructureCard