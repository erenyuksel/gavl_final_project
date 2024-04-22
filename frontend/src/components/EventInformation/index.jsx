const EventInformationSection = ({ event }) => {
  console.log(event)
  return (
    <>
      <h1>Event Information</h1>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Event name:</span>
        </div>
        <input
          type="text"
          name="name"
          value={event.name}
          placeholder="Event name"
          className="input input-ghost w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Event description:</span>
        </div>
        <input
          type="text"
          name="description"
          value={event.description}
          placeholder="Event description"
          className="input input-ghost w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Created date:</span>
        </div>
        <input
          type="text"
          name="created_at"
          value={event.created_at}
          placeholder="Created date"
          className="input input-ghost w-full max-w-xs"
        />
      </label>
      <div className="flex">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Event start date:</span>
          </div>
          <input
            type="text"
            name="start_date"
            value={event.start_date}
            placeholder="Event start date"
            className="input input-ghost w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Event end date:</span>
          </div>
          <input
            disabled
            type="text"
            name="end_date"
            value={event.end_date}
            placeholder="Event end date"
            className="input input-ghost w-full max-w-xs disabled:bg-inherit disabled:border-none"
          />
        </label>
      </div>
      <div className="border-t border-gray-100"></div>
    </>
  )
}

export default EventInformationSection
