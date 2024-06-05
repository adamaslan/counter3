import { Bar, CartesianChart } from "victory-native"
//👇 Import useFont from React Native Skia
import { useFont } from "@shopify/react-native-skia"
//👇 Also import a ttf file for the font you want to use.

const data = Array.from({ length: 6 }, (_, index) => ({
  // Starting at 1 for Jaunary
  month: index + 1,
  // Randomizing the listen count between 100 and 50
  listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
}))
const Bar1 = () => {
  const font = useFont("../assets/fonts/SpaceMono-Regular.ttf", 12) //👈 Create a font object with the font file and size.

  return (
    <CartesianChart
      data={data}
      xKey="month"
      yKeys={["listenCount"]}
      // 👇 Add domain padding to the chart to prevent the first and last bar from being cut off.
      domainPadding={{ left: 50, right: 50, top: 30 }}
      axisOptions={{
        /**
         * 👇 Pass the font object to the axisOptions.
         * This will tell CartesianChart to render axis labels.
         */

         font,
        
        /**
         * 👇 We will also use the formatXLabel prop to format the month number
         * from a number to a month name.
         */
        formatXLabel: (value) => {
          const date = new Date(2023, value - 1);
          return date.toLocaleString("default", { month: "short" });
        },
      }}
    >
      {({ points, chartBounds }) => (
        <Bar
          chartBounds={chartBounds}
          points={points.listenCount}
          /**
           * 👇 We can round the top corners of our bars by passing a number
           * to the roundedCorners prop. This will round the top left and top right.
           */
          roundedCorners={{
            topLeft: 5,
            topRight: 5,
          }}
        />
      )}
    </CartesianChart>
  )
}


export default Bar1;
