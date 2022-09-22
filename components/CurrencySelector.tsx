import { Select, ThemingProps, useColorModeValue } from "@chakra-ui/react";
import { useContext } from "react";
import AppContext from "../context/app-context";
type size = ThemingProps['size']
export default function CurrencySelector({size, mb} : {size?: size, mb?: number}) {
  const app = useContext(AppContext);
  return (
    <Select
      maxW={"100px"}
      variant={"filled"}
      size={size ?? 'lg'}
      bg={useColorModeValue("gray.100", "gray.700")}
      onChange={(e) => app.changeCurrency(e.target.value)}
      defaultValue={app.state.current_currency.code}
      mb={mb ?? 0}
    >
      {app.state.dealing_currencies.map((currency, index) => {
        return (
          <option key={index} value={currency}>
            {currency}
          </option>
        );
      })}
    </Select>
  );
}
