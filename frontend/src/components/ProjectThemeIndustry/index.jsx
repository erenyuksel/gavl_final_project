const ProjectThemeIndustry = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="card flex-row bg-base-100">
        <div className="card-body overflow-scroll">
          <div className="flex justify-center items-center mb-4">
            <h2 className="card-title"></h2>
          </div>
          <div className="flex flex-col h-60 sm:flex-row justify-between gap-10">
            <div className="flex flex-col text-center items-center">
              <h3 className="m-5">
                <strong>Themes</strong>
              </h3>
              {parsedContent['theme 1'] ? (
                <p className="badge badge-lg bg-primary text-white sm:badge-md mb-2 sm:mb-1 truncate">
                  {parsedContent['theme 1']}
                </p>
              ) : (
                <div className="h-[38px] sm:h-[30px]"></div>
              )}
              {parsedContent['theme 2'] ? (
                <p className="badge badge-lg bg-primary text-white sm:badge-md mb-2 sm:mb-1 truncate">
                  {parsedContent['theme 2']}
                </p>
              ) : (
                <div className="h-[38px] sm:h-[30px]"></div>
              )}
              {parsedContent['theme 3'] ? (
                <p className="badge badge-lg bg-primary text-white sm:badge-md mb-2 sm:mb-1 truncate">
                  {parsedContent['theme 3']}
                </p>
              ) : (
                <div className="h-[38px] sm:h-[30px]"></div>
              )}
              {parsedContent['theme 4'] ? (
                <p className="badge badge-lg bg-primary text-white sm:badge-md mb-2 sm:mb-1 truncate">
                  {parsedContent['theme 4']}
                </p>
              ) : (
                <div className="h-[38px] sm:h-[30px]"></div>
              )}
              {parsedContent['theme 5'] ? (
                <p className="badge badge-lg bg-primary text-white sm:badge-sm mb-2 sm:mb-1 truncate">
                  {parsedContent['theme 5']}
                </p>
              ) : (
                <div className="h-[38px] sm:h-[30px]"></div>
              )}
            </div>
            <div className="flex flex-col text-center">
              <h3 className="m-5">
                <strong>Industry</strong>
              </h3>
              <div>
                {parsedContent['Industry 1'] ? (
                  <div className="badge badge-md bg-gray-400 text-white truncate">
                    {parsedContent['Industry 1']}
                  </div>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
              </div>
              <div>
                {parsedContent['Industry 2'] ? (
                  <p className="badge badge-md bg-gray-400 text-white sm:badge-md mb-2 sm:mb-1 truncate">
                    {parsedContent['Industry 2']}
                  </p>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
              </div>
              <div>
                {parsedContent['Industry 3'] ? (
                  <p className="badge badge-md bg-gray-400 text-white sm:badge-md badge-outline mb-2 sm:mb-1 truncate">
                    {parsedContent['Industry 3']}
                  </p>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectThemeIndustry
