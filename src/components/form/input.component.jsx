import { useController } from "react-hook-form";
export const InputLabel = ({ field, labelTxt }) => {
  return (
    <>
      <label
        htmlFor={field}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelTxt}
      </label>
    </>
  );
};

export const TextInputField = ({
  control,
  type = "text",
  name,
  defaultValue = "",
  errMsg = null,
  placeholder = "",
}) => {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: defaultValue,
  });
  return (
    <>
      <input
        type={type}
        {...field}
        className={`
                bg-gray-50 
                border 
                ${errMsg ? "border-red-400" : "border-gray-300"}
                text-gray-900 
                rounded-lg 
                focus:ring-primary-600 
                focus:border-primary-600 
                block 
                w-full 
                p-2 
                dark:bg-gray-700
                 dark:border-gray-600 
                 dark:placeholder-gray-400 
                 dark:text-white 
                 dark:focus:ring-blue-500 
                 dark:focus:border-blue-500`}
        placeholder={placeholder}
      />
      {errMsg ? (
        <>
          <span className="text-sm italic text-red-800">{errMsg}</span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export const RadioInputField = ({ options, name, control, errMsg = null }) => {
  const {
    field: { onChange, value },
  } = useController({
    control: control,
    name: name,
  });
  return (
    <>
      {options.map((option, index) => (
        <div key={index} className="flex items-center mr-4">
          <input
            id={option.value}
            type="radio"
            value={option.value}
            name={name}
            onChange={(e) => {
              if (e.target.checked) {
                onChange(option.value);
              }
            }}
            className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500"
          />
          <label
            htmlFor={option.value}
            className="ml-2 text-sm font-medium text-gray-900"
          >
            {option.label}
          </label>
        </div>
      ))}
      {errMsg ? (
        <>
          <span className="text-sm italic text-red-800">{errMsg}</span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export const SelectOptionField = ({
  control,
  name,
  errMsg = null,
  options,
}) => {
  const { field } = useController({
    control: control,
    name: name,
  });
  return (
    <>
      <select
        id={name}
        {...field}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
      >
        <option value="">--Select Any one--</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errMsg ? (
        <>
          <span className="text-sm italic text-red-800">{errMsg}</span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export const TextAreaField = ({ control, name, errMsg = null }) => {
  const { field } = useController({
    name: name,
    control: control,
  });
  return (
    <>
      <textarea
        id={name}
        {...field}
        rows={3}
        style={{ resize: "none" }}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500"
        placeholder="Your address..."
      ></textarea>
      {errMsg ? (
        <>
          <span className="text-sm italic text-red-800">{errMsg}</span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export const FileUploadField = ({
  control,
  name,
  errMsg = null,
  isMultiple = false,
  setError = null,
}) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name: name,
  });

  return (
    <>
      <div className="flex">
        <div className={`me-3 ${isMultiple ? "w-full" : "w-3/4"}`}>
          <input
            onChange={(e) => {
              if (isMultiple) {
                onChange(Object.values(e.target.files));
              } else {
                // custom
                // ext
                let image = e.target.files["0"];
                // "aws.png" == split(".") ===> ["aws","png"] == pop() ===> "png"
                let ext = image.name.split(".").pop(); //
                if (
                  !["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(
                    ext
                  )
                ) {
                  // setError({[name]: "Image format invalid"})
                  setError(name, { message: "Image format Invalid" });
                } else if (image.size > 1 * 1024 * 1024) {
                  setError(name, {
                    message: "File size should be less than or equal to 2MB",
                  });
                } else {
                  onChange(image);
                }
              }
            }}
            multiple={isMultiple}
            className="block text-sm w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            id={name}
            type="file"
          />
          {errMsg ? (
            <>
              <span className="text-sm italic text-red-800">{errMsg}</span>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className={` ${isMultiple ? "w-full" : "w-1/4"}`}>
          {Array.isArray(value) ? (
            <div className="flex">
              {value.map((img, inx) => (
                <div key={inx}>
                  <img
                    className="w-full"
                    src={URL.createObjectURL(img)}
                    alt=""
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <img
                className="w-full"
                src={
                  value
                    ? typeof value === "string"
                      ? value
                      : URL.createObjectURL(value)
                    : "https://placehold.co/600x400"
                }
                alt=""
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
