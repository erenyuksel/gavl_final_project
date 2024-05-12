import { FaGlobe, FaLinkedin, FaYoutube } from 'react-icons/fa'

const ProjectHeader = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {parsedContent.name}
        </h1>
        <div className="flex items-center">
          {/* Website*/}
          <a
            href={parsedContent['Website of organisation']}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <FaGlobe className="h-6 w-6" />
          </a>
          {/* LinkedIn*/}
          <a
            href={parsedContent['LinkedIn of organisation']}
            className="text-blue-500 hover:text-blue-700 p-2"
          >
            <FaLinkedin className="h-7 w-7" />
          </a>
          {/* Youtube*/}
          <a
            href={parsedContent['Video of organisation or product']}
            className="text-red-600 hover:text-red-800 p-2"
          >
            <FaYoutube className="h-8 w-8" />
          </a>
        </div>
      </div>
    </>
  )
}

export default ProjectHeader
