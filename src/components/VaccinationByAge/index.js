import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationDetails} = props
  return (
    <div>
      <h1>Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={vaccinationDetails}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="45-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
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

export default VaccinationByAge
