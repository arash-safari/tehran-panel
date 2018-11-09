import {
  green,
  lightGreen,
  brown,
  cyan,
  indigo,
  lightBlue,
  orange,
  pink,
  purple,
  teal,
  yellow,
  red
} from "@material-ui/core/colors";

const colors = [green,
  lightGreen,
  cyan,
  lightBlue,
  orange,
  pink,
  purple,
  red];
export const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 9);
  const randomintense = (Math.floor(Math.random() * 9+1))*100;
  try {
    return colors[randomColor][randomintense];
  }catch (e) {
    return  colors[3][300];
  }
};
