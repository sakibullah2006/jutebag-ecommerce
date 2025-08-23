import * as Icon from '@phosphor-icons/react'

interface Props {
    quantityList: number[];
    setQuantity: (quantity: number) => void;
    quantity: number;
}

const QuantitySelector: React.FC<Props> = ({ quantityList, setQuantity, quantity }) => {
    // Handle empty quantity list
    if (quantityList.length === 0) {
        return (
            <div className="p-2 min-w-[140px] w-[40%]">
                <div className="relative">
                    <select
                        name="quantity-select"
                        id="quantity-select"
                        className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-base text-gray-500 cursor-not-allowed appearance-none pr-10"
                        value=""
                        disabled
                    >
                        <option value="">No quantity available</option>
                    </select>
                    <Icon.CaretUpDownIcon weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={20} />
                </div>
            </div>
        );
    }

    // Set initial quantity if current quantity is invalid
    if (quantity === 0 || !quantityList.includes(quantity)) {
        setQuantity(quantityList[0]);
    }

    return (
        <div className="p-2 min-w-[140px] w-[40%]">
            <label htmlFor="quantity-select" className="block">
                <div className="relative">
                    <select
                        name="quantity-select"
                        id="quantity-select"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all shadow-sm appearance-none pr-10 hover:border-blue-400"
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', cursor: 'pointer' }}
                    >
                        {quantityList.map(q => (
                            <option key={q} value={q} className="text-base text-gray-900 bg-white hover:bg-blue-50">
                                {q}
                            </option>
                        ))}
                    </select>
                    <Icon.CaretUpDownIcon weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={20} />
                </div>
            </label>
        </div>
    )
}

export default QuantitySelector