import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationDetails} = props
  return (
    <div>
      <h1>Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={300} className="pie-chart">
        <PieChart>
          <Pie
            data={vaccinationDetails}
            startAngle={180}
            endAngle={0}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="middle"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
