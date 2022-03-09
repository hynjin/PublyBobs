import { Controller, Control, FieldValues } from 'react-hook-form';

type AddRestaurantFormProps = {
    control: Control<FieldValues, any>;
    index: number;
    orders: any;
};

export default function AddRestaurantForm(props: AddRestaurantFormProps) {
    const { control, index, orders } = props;

    return (
        <>
            <div key={`add-restaurant-${index}`}>
                <div className="mb-6 flex flex-col">
                    <Controller
                        control={control}
                        name={`order.${index}.restaurant.name`}
                        render={({ field }) => (
                            <input
                                className="input"
                                type="text"
                                placeholder="식당 이름"
                                autoFocus={false}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={`order.${index}.restaurant.url`}
                        render={({ field }) => (
                            <input
                                className="input"
                                type="text"
                                placeholder="URL"
                                autoFocus={false}
                                {...field}
                            />
                        )}
                    />
                </div>
            </div>
        </>
    );
}
