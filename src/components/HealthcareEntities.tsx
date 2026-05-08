import { client } from "../utils/Client";
import AnalysisTestForm from "./AnalysisTestForm";
import { useTextAnalysisLanguage } from "../context/TextAnalysisLanguageContext";

const documents = [
  "Prescribed 100mg ibuprofen, taken twice daily.",
  "Patient does not suffer from high blood pressure."
];
  
const HealthcareEntities = () => {
  const { lan } = useTextAnalysisLanguage();

  const analyzeHealthcareEntities = async (
    inputDocuments: string[]
  ) => {
    const poller = await client.beginAnalyzeHealthcareEntities(inputDocuments);
    const results = await poller.pollUntilDone();
    return results
  }

  return (
    <AnalysisTestForm
      defaultDocuments={documents}
      language={lan}
      onSubmit={analyzeHealthcareEntities}
      description="Identifies healthcare entities including medications, conditions, and procedures."
    />
  )
} 

export default HealthcareEntities