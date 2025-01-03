import { ProductInterface } from "../data/data";
import { sleep } from "../utils/sleep";

interface Props {
    product: ProductInterface
}

const SlowProduct = ({ product }: Props) => {
    sleep(1);
    return (
        <li>
            Product {product.name}
        </li>
    )
}

export default SlowProduct