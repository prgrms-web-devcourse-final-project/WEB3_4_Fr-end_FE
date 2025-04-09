import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>; // ← 이게 핵심!
}

export default function SelectField<T extends FieldValues>({
  control,
  errors,
  name,
}: SelectFieldProps<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-black text-base font-normal mb-1">성별</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: "성별을 선택해주세요." }}
        render={({ field }) => (
          <select
            {...field}
            className="w-full h-[50px] px-2.5 bg-white rounded outline outline-customGray-500 text-[13px] text-customGray-400 focus:outline-customBlack-400"
          >
            <option value="">성별</option>
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </select>
        )}
      />
      {name in errors && errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {(errors[name]?.message ?? "") as string}
        </span>
      )}
    </div>
  );
}
