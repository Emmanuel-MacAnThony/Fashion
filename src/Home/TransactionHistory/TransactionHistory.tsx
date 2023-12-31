import { StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { Box, Text, Theme, makeStyles } from "../../components/Theme";
import Header from "../../components/Header";
import { HomeNavigationProps } from "../../components/Navigation";
import { DataPoint } from "./Graph";
import Graph from "./Graph/Graph";
import Transaction from "./Transaction";

const startDate = "2019-09-01"; //new Date("09/01/2019").getTime();
const numberOfMonths = 6;

const graphData: DataPoint[] = [
  {
    id: 245674,
    date: "2019-10-01", //new Date("10/01/2019").getTime(),
    value: 139.42,
    color: "primary",
  },
  {
    id: 245675,
    date: "2019-12-01", //new Date("12/01/2019").getTime(),
    value: 281.23,
    color: "graph1",
  },
  {
    id: 245677,
    date: "2020-02-01", //new Date("02/01/2020").getTime(),
    value: 198.54,
    color: "graph2",
  },
];
const footerHeight = Dimensions.get("window").width / 5.5;
const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  scrollView: {
    paddingBottom: footerHeight,
  },
}));

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<"TransactionHistory">) => {
  const styles = useStyles();
  return (
    <Box flex={1} backgroundColor={"background"}>
      <Header
        title="Transaction History"
        left={{ icon: "arrow-left", onPress: () => navigation.openDrawer() }}
        right={{ icon: "share", onPress: () => true }}
      />
      <Box flex={1} padding={"m"}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Text variant="header" color="secondary" opacity={0.3}>
              TOTAL SPENT
            </Text>
            <Text variant="title1">$619.19</Text>
          </Box>
          <Box backgroundColor="primaryLight" borderRadius="l" padding="s">
            <Text variant={"body"} color="primary">
              All Time
            </Text>
          </Box>
        </Box>
        <Graph
          numberOfMonths={numberOfMonths}
          data={graphData}
          startDate={startDate}
        />
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {graphData.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({});
