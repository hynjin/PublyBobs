import {
    Controller,
    Control,
    FieldValues,
    useFieldArray,
} from 'react-hook-form';
import _ from 'lodash';
import { XIcon } from '@heroicons/react/outline';

type AddMenuFormProps = {
    control: Control<FieldValues, any>;
    index: number;
};

export default function AddMenuForm(props: AddMenuFormProps) {
    const { control, index, idx } = props;

    const emptyMenu = {
        name: '',
        description: '',
    };

    const { fields, append, remove } = useFieldArray({
        name: `order.${index}.menu`,
        control,
    });

    return (
        <div key={`order-${index}`}>
            {fields.map((field, idx) => {
                return (
                    idx === fields.length - 1 ? (
                        <div key={field.id} className="mt-8 flex flex-col">
                            <Controller
                                control={control}
                                name={`order.${index}.menu.${idx}.name`}
                                render={({ field }) => (
                                    <input
                                        className="input mb-2"
                                        type="text"
                                        placeholder="새로운 메뉴"
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name={`order.${index}.menu.${idx}.description`}
                                render={({ field }) => (
                                    <input
                                        className="input mb-2"
                                        type="text"
                                        placeholder="메모를 추가할 수 있어요. (40자)"
                                        {...field}
                                    />
                                )}
                            />
                            {/* TODO: 식당이름이 비어있을 때에는 메뉴 추가가 되지 않아야 함 (현재 빈칸이 입력됨) */}
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => append(emptyMenu)}
                            >
                                메뉴 추가
                            </button>
                        </div>
                    ) : (
                        <div key={field.id} className="mb-2 border flex">
                            <div className="p-3 flex-1">
                                <Controller
                                    control={control}
                                    name={`order.${index}.menu.${idx}.name`}
                                    render={({ field }) => (
                                        <input
                                            className="text-sm text-gray-900 p-0 bg-white"
                                            type="text"
                                            disabled
                                            {...field}
                                        />
                                    )}
                                />
                                {/* TODO: input 값이 있을 때에만 나오도록 */}
                                <Controller
                                    control={control}
                                    name={`order.${index}.menu.${idx}.description`}
                                    render={({ field }) => (
                                        <input
                                            className="text-xs text-gray-700 p-0 bg-white"
                                            type="text"
                                            disabled
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <button
                                type="button"
                                className="flex-none p-3"
                                onClick={() => {
                                    remove(idx);
                                }}
                            >
                                <XIcon className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    )
                );
            })}
        </div>
    );
}
