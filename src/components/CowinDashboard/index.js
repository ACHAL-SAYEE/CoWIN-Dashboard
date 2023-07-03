import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {vaccinationData: {}, apiStatus: 'INITIAL'}

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/covid-vaccination-data`

    const ConvertSnakeCaseToCamelCase = data => ({
      vaccineDate: data.vaccine_date,
      dose1: data.dose_1,
      dose2: data.dose_2,
    })

    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          vaccination => ConvertSnakeCaseToCamelCase(vaccination),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age,
        vaccinationByGender: fetchedData.vaccination_by_gender,
      }
      console.log(updatedData)
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderVaccinationDetails = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <VaccinationCoverage
          vaccinationDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    let displayElement = null
    if (apiStatus === apiStatusConstants.success) {
      displayElement = this.renderVaccinationDetails()
    } else if (apiStatus === apiStatusConstants.inProgress) {
      displayElement = (
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
        </div>
      )
    } else if (apiStatus === apiStatusConstants.failure) {
      displayElement = (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
          />
          <h1>Something went wrong</h1>
        </div>
      )
    }
    return (
      <div className="bg">
        <div className="logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-img"
          />
          <h1 className="heading">Co-WIN</h1>
        </div>
        <h1 className="heading2">CoWIN Vaccination in India</h1>
        {displayElement}
      </div>
    )
  }
}
export default CowinDashboard
