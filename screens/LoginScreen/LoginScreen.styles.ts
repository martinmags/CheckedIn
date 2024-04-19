import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 3,
    width: "100%",
    backgroundColor: "#6DA67A",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  textContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 50,
    fontWeight: "700",
    color: "#777777",
  },
  textDescription: {
    fontSize: 20,
    fontWeight: "400",
    color: "#A4A4A4",
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
