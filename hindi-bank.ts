import { MCQ } from './mcq';
import { getAllGeneratedHindiQuestions } from './hindi-data';

export interface HindiMCQ extends MCQ {
  topic: string;
}

const _staticHindiBank: HindiMCQ[] = [

  // ══════════════════════════════════════════
  // पर्यायवाची शब्द (Synonyms) — 50 questions
  // ══════════════════════════════════════════
  { topic: 'paryayvachi', question: '"सूर्य" का पर्यायवाची शब्द है:', options: ['चंद्र', 'रवि', 'तारा', 'ग्रह'], correctIndex: 1, explanation: 'सूर्य के पर्यायवाची: रवि, दिनकर, भास्कर, दिवाकर, आदित्य, अर्क।' },
  { topic: 'paryayvachi', question: '"पर्वत" का पर्यायवाची शब्द है:', options: ['नदी', 'वन', 'गिरि', 'मैदान'], correctIndex: 2, explanation: 'पर्वत के पर्यायवाची: गिरि, अचल, शैल, नग, भूधर।' },
  { topic: 'paryayvachi', question: '"जल" का पर्यायवाची शब्द है:', options: ['अग्नि', 'नीर', 'वायु', 'धरा'], correctIndex: 1, explanation: 'जल के पर्यायवाची: नीर, वारि, तोय, अंबु, पानी।' },
  { topic: 'paryayvachi', question: '"आकाश" का पर्यायवाची शब्द है:', options: ['धरती', 'समुद्र', 'गगन', 'पाताल'], correctIndex: 2, explanation: 'आकाश के पर्यायवाची: गगन, अंबर, नभ, आसमान, व्योम।' },
  { topic: 'paryayvachi', question: '"घर" का पर्यायवाची शब्द है:', options: ['वन', 'सदन', 'नगर', 'मार्ग'], correctIndex: 1, explanation: 'घर के पर्यायवाची: सदन, गृह, भवन, आवास, निलय।' },
  { topic: 'paryayvachi', question: '"रात" का पर्यायवाची शब्द है:', options: ['प्रभात', 'निशा', 'संध्या', 'दोपहर'], correctIndex: 1, explanation: 'रात के पर्यायवाची: निशा, रात्रि, रजनी, यामिनी, निशीथ।' },
  { topic: 'paryayvachi', question: '"अग्नि" का पर्यायवाची शब्द है:', options: ['जल', 'पवन', 'अनल', 'धरा'], correctIndex: 2, explanation: 'अग्नि के पर्यायवाची: अनल, पावक, वह्नि, आग, दहन।' },
  { topic: 'paryayvachi', question: '"नेत्र" का पर्यायवाची शब्द है:', options: ['कान', 'नाक', 'आँख', 'मुख'], correctIndex: 2, explanation: 'नेत्र के पर्यायवाची: आँख, चक्षु, लोचन, दृग, नयन।' },
  { topic: 'paryayvachi', question: '"हाथी" का पर्यायवाची शब्द है:', options: ['अश्व', 'गज', 'मृग', 'सिंह'], correctIndex: 1, explanation: 'हाथी के पर्यायवाची: गज, हस्ती, करी, द्विप, मातंग।' },
  { topic: 'paryayvachi', question: '"सोना (स्वर्ण)" का पर्यायवाची शब्द है:', options: ['रजत', 'कनक', 'कांस्य', 'लोहा'], correctIndex: 1, explanation: 'सोने के पर्यायवाची: कनक, स्वर्ण, हेम, हाटक, कुंदन।' },
  { topic: 'paryayvachi', question: '"शत्रु" का पर्यायवाची शब्द है:', options: ['मित्र', 'भाई', 'अरि', 'पड़ोसी'], correctIndex: 2, explanation: 'शत्रु के पर्यायवाची: अरि, रिपु, दुश्मन, वैरी, विपक्षी।' },
  { topic: 'paryayvachi', question: '"राजा" का पर्यायवाची शब्द है:', options: ['नौकर', 'भृत्य', 'नृप', 'प्रजा'], correctIndex: 2, explanation: 'राजा के पर्यायवाची: नृप, भूप, नरेश, महीप, राजन।' },
  { topic: 'paryayvachi', question: '"वन" का पर्यायवाची शब्द है:', options: ['नदी', 'पर्वत', 'कानन', 'मैदान'], correctIndex: 2, explanation: 'वन के पर्यायवाची: कानन, जंगल, अरण्य, विपिन, अटवी।' },
  { topic: 'paryayvachi', question: '"पत्नी" का पर्यायवाची शब्द है:', options: ['सखी', 'भार्या', 'बहन', 'माता'], correctIndex: 1, explanation: 'पत्नी के पर्यायवाची: भार्या, वधू, अर्धांगिनी, जाया, वामा।' },
  { topic: 'paryayvachi', question: '"वायु" का पर्यायवाची शब्द है:', options: ['जल', 'पवन', 'धूप', 'छाया'], correctIndex: 1, explanation: 'वायु के पर्यायवाची: पवन, समीर, अनिल, मारुत, हवा।' },
  { topic: 'paryayvachi', question: '"समुद्र" का पर्यायवाची शब्द है:', options: ['नदी', 'सागर', 'झील', 'कुआँ'], correctIndex: 1, explanation: 'समुद्र के पर्यायवाची: सागर, सिंधु, जलधि, अंबुधि, रत्नाकर।' },
  { topic: 'paryayvachi', question: '"पुत्र" का पर्यायवाची शब्द है:', options: ['पिता', 'तनय', 'भाई', 'चाचा'], correctIndex: 1, explanation: 'पुत्र के पर्यायवाची: तनय, आत्मज, सुत, वत्स, नंदन।' },
  { topic: 'paryayvachi', question: '"पृथ्वी" का पर्यायवाची शब्द है:', options: ['आकाश', 'वसुधा', 'नदी', 'पर्वत'], correctIndex: 1, explanation: 'पृथ्वी के पर्यायवाची: वसुधा, धरा, भूमि, धरती, अवनि।' },
  { topic: 'paryayvachi', question: '"चाँद" का पर्यायवाची शब्द है:', options: ['सूर्य', 'तारा', 'शशि', 'ग्रह'], correctIndex: 2, explanation: 'चाँद के पर्यायवाची: शशि, चंद्रमा, निशापति, राकेश, इंदु।' },
  { topic: 'paryayvachi', question: '"कमल" का पर्यायवाची शब्द है:', options: ['गुलाब', 'पंकज', 'चमेली', 'मोगरा'], correctIndex: 1, explanation: 'कमल के पर्यायवाची: पंकज, राजीव, नलिन, अंबुज, सरोज।' },
  { topic: 'paryayvachi', question: '"नदी" का पर्यायवाची शब्द है:', options: ['सागर', 'सरिता', 'झील', 'तालाब'], correctIndex: 1, explanation: 'नदी के पर्यायवाची: सरिता, तटिनी, निर्झरिणी, आपगा, स्रोतस्विनी।' },
  { topic: 'paryayvachi', question: '"ईश्वर" का पर्यायवाची शब्द है:', options: ['राजा', 'परमेश्वर', 'मनुष्य', 'देवता'], correctIndex: 1, explanation: 'ईश्वर के पर्यायवाची: परमेश्वर, परमात्मा, भगवान, प्रभु, ईश।' },
  { topic: 'paryayvachi', question: '"दूध" का पर्यायवाची शब्द है:', options: ['पानी', 'दुग्ध', 'रस', 'शरबत'], correctIndex: 1, explanation: 'दूध के पर्यायवाची: दुग्ध, पय, क्षीर, स्तन्य, गोरस।' },
  { topic: 'paryayvachi', question: '"घोड़ा" का पर्यायवाची शब्द है:', options: ['गज', 'अश्व', 'व्याघ्र', 'मृग'], correctIndex: 1, explanation: 'घोड़े के पर्यायवाची: अश्व, हय, तुरग, वाजि, घोटक।' },
  { topic: 'paryayvachi', question: '"सिंह" का पर्यायवाची शब्द है:', options: ['हाथी', 'बाघ', 'केसरी', 'भालू'], correctIndex: 2, explanation: 'सिंह के पर्यायवाची: केसरी, मृगेंद्र, शेर, व्याघ्र नहीं — केसरी, हरि, शार्दूल।' },
  { topic: 'paryayvachi', question: '"अमृत" का पर्यायवाची शब्द है:', options: ['विष', 'सुधा', 'जल', 'दूध'], correctIndex: 1, explanation: 'अमृत के पर्यायवाची: सुधा, पीयूष, अमिय, नेक्टर।' },
  { topic: 'paryayvachi', question: '"काला" का पर्यायवाची शब्द है:', options: ['श्वेत', 'श्याम', 'पीला', 'लाल'], correctIndex: 1, explanation: 'काला के पर्यायवाची: श्याम, कृष्ण, असित, स्याह।' },
  { topic: 'paryayvachi', question: '"पत्ता" का पर्यायवाची शब्द है:', options: ['फूल', 'पत्र', 'फल', 'जड़'], correctIndex: 1, explanation: 'पत्ता के पर्यायवाची: पत्र, पर्ण, दल, पल्लव।' },
  { topic: 'paryayvachi', question: '"बादल" का पर्यायवाची शब्द है:', options: ['वर्षा', 'मेघ', 'आँधी', 'ओला'], correctIndex: 1, explanation: 'बादल के पर्यायवाची: मेघ, घन, जलद, वारिद, अंबुद।' },
  { topic: 'paryayvachi', question: '"ब्राह्मण" का पर्यायवाची शब्द है:', options: ['क्षत्रिय', 'द्विज', 'वैश्य', 'शूद्र'], correctIndex: 1, explanation: 'ब्राह्मण के पर्यायवाची: द्विज, विप्र, भू-सुर, अग्रजन्मा।' },

  // ══════════════════════════════════════════
  // विलोम शब्द (Antonyms) — 50 questions
  // ══════════════════════════════════════════
  { topic: 'vilom', question: '"दिन" का विलोम शब्द है:', options: ['संध्या', 'रात', 'प्रभात', 'दोपहर'], correctIndex: 1, explanation: 'दिन का विलोम: रात/रात्रि।' },
  { topic: 'vilom', question: '"सुख" का विलोम शब्द है:', options: ['आनंद', 'हर्ष', 'दुःख', 'प्रसन्नता'], correctIndex: 2, explanation: 'सुख का विलोम: दुःख।' },
  { topic: 'vilom', question: '"उचित" का विलोम शब्द है:', options: ['सही', 'उत्तम', 'अनुचित', 'श्रेष्ठ'], correctIndex: 2, explanation: 'उचित का विलोम: अनुचित।' },
  { topic: 'vilom', question: '"स्वर्ग" का विलोम शब्द है:', options: ['पृथ्वी', 'नरक', 'पाताल', 'आकाश'], correctIndex: 1, explanation: 'स्वर्ग का विलोम: नरक।' },
  { topic: 'vilom', question: '"सत्य" का विलोम शब्द है:', options: ['झूठ', 'कपट', 'असत्य', 'मिथ्या'], correctIndex: 2, explanation: 'सत्य का विलोम: असत्य। झूठ और मिथ्या भी समानार्थी हैं।' },
  { topic: 'vilom', question: '"ज्ञान" का विलोम शब्द है:', options: ['बुद्धि', 'विद्या', 'अज्ञान', 'चतुरता'], correctIndex: 2, explanation: 'ज्ञान का विलोम: अज्ञान।' },
  { topic: 'vilom', question: '"आय" का विलोम शब्द है:', options: ['धन', 'व्यय', 'संपत्ति', 'कमाई'], correctIndex: 1, explanation: 'आय का विलोम: व्यय (खर्च)।' },
  { topic: 'vilom', question: '"कठोर" का विलोम शब्द है:', options: ['मजबूत', 'दृढ़', 'कोमल', 'कठिन'], correctIndex: 2, explanation: 'कठोर का विलोम: कोमल/मृदु।' },
  { topic: 'vilom', question: '"संयोग" का विलोम शब्द है:', options: ['योग', 'मिलन', 'वियोग', 'संगम'], correctIndex: 2, explanation: 'संयोग का विलोम: वियोग।' },
  { topic: 'vilom', question: '"सजीव" का विलोम शब्द है:', options: ['जीवित', 'निर्जीव', 'मृत', 'प्राणी'], correctIndex: 1, explanation: 'सजीव का विलोम: निर्जीव।' },
  { topic: 'vilom', question: '"प्रेम" का विलोम शब्द है:', options: ['स्नेह', 'घृणा', 'द्वेष', 'वैर'], correctIndex: 1, explanation: 'प्रेम का विलोम: घृणा।' },
  { topic: 'vilom', question: '"स्थायी" का विलोम शब्द है:', options: ['सदैव', 'चिरस्थायी', 'अस्थायी', 'शाश्वत'], correctIndex: 2, explanation: 'स्थायी का विलोम: अस्थायी।' },
  { topic: 'vilom', question: '"आदान" का विलोम शब्द है:', options: ['लेना', 'लाभ', 'प्रदान', 'संग्रह'], correctIndex: 2, explanation: 'आदान का विलोम: प्रदान (देना)।' },
  { topic: 'vilom', question: '"निर्माण" का विलोम शब्द है:', options: ['बनाना', 'रचना', 'विनाश', 'स्थापना'], correctIndex: 2, explanation: 'निर्माण का विलोम: विनाश।' },
  { topic: 'vilom', question: '"आस्तिक" का विलोम शब्द है:', options: ['धार्मिक', 'नास्तिक', 'पापी', 'भक्त'], correctIndex: 1, explanation: 'आस्तिक का विलोम: नास्तिक।' },
  { topic: 'vilom', question: '"उन्नति" का विलोम शब्द है:', options: ['प्रगति', 'विकास', 'अवनति', 'वृद्धि'], correctIndex: 2, explanation: 'उन्नति का विलोम: अवनति।' },
  { topic: 'vilom', question: '"आरंभ" का विलोम शब्द है:', options: ['शुरू', 'प्रारंभ', 'अंत', 'मध्य'], correctIndex: 2, explanation: 'आरंभ का विलोम: अंत/समाप्ति।' },
  { topic: 'vilom', question: '"साकार" का विलोम शब्द है:', options: ['आकार', 'निराकार', 'स्वरूप', 'मूर्त'], correctIndex: 1, explanation: 'साकार (मूर्त रूप) का विलोम: निराकार।' },
  { topic: 'vilom', question: '"विधवा" का विलोम शब्द है:', options: ['अविवाहित', 'सधवा', 'वृद्ध', 'युवती'], correctIndex: 1, explanation: 'विधवा का विलोम: सधवा (जिसका पति जीवित हो)।' },
  { topic: 'vilom', question: '"उदार" का विलोम शब्द है:', options: ['दयालु', 'कृपालु', 'कंजूस', 'महान'], correctIndex: 2, explanation: 'उदार का विलोम: कंजूस/कृपण।' },
  { topic: 'vilom', question: '"मूर्ख" का विलोम शब्द है:', options: ['बेवकूफ', 'चतुर', 'अज्ञानी', 'सीधा'], correctIndex: 1, explanation: 'मूर्ख का विलोम: चतुर/विद्वान।' },
  { topic: 'vilom', question: '"हर्ष" का विलोम शब्द है:', options: ['खुशी', 'प्रसन्नता', 'विषाद', 'उल्लास'], correctIndex: 2, explanation: 'हर्ष का विलोम: विषाद/शोक।' },
  { topic: 'vilom', question: '"अमीर" का विलोम शब्द है:', options: ['धनवान', 'गरीब', 'साहूकार', 'दानी'], correctIndex: 1, explanation: 'अमीर का विलोम: गरीब/निर्धन।' },
  { topic: 'vilom', question: '"क्रूर" का विलोम शब्द है:', options: ['निर्दयी', 'कठोर', 'दयालु', 'कड़क'], correctIndex: 2, explanation: 'क्रूर का विलोम: दयालु/कोमल।' },
  { topic: 'vilom', question: '"सफलता" का विलोम शब्द है:', options: ['जीत', 'विजय', 'असफलता', 'हार'], correctIndex: 2, explanation: 'सफलता का विलोम: असफलता/विफलता।' },
  { topic: 'vilom', question: '"प्रश्न" का विलोम शब्द है:', options: ['जिज्ञासा', 'संशय', 'उत्तर', 'विवाद'], correctIndex: 2, explanation: 'प्रश्न का विलोम: उत्तर।' },
  { topic: 'vilom', question: '"पूर्व" का विलोम शब्द है:', options: ['उत्तर', 'पश्चिम', 'दक्षिण', 'ऊपर'], correctIndex: 1, explanation: 'पूर्व (East) का विलोम: पश्चिम (West)।' },
  { topic: 'vilom', question: '"आकर्षण" का विलोम शब्द है:', options: ['खिंचाव', 'प्रेम', 'विकर्षण', 'स्नेह'], correctIndex: 2, explanation: 'आकर्षण का विलोम: विकर्षण।' },
  { topic: 'vilom', question: '"जन्म" का विलोम शब्द है:', options: ['जीवन', 'मृत्यु', 'बचपन', 'वृद्धावस्था'], correctIndex: 1, explanation: 'जन्म का विलोम: मृत्यु।' },
  { topic: 'vilom', question: '"विश्वास" का विलोम शब्द है:', options: ['श्रद्धा', 'आस्था', 'अविश्वास', 'भक्ति'], correctIndex: 2, explanation: 'विश्वास का विलोम: अविश्वास।' },
  { topic: 'vilom', question: '"शीत" का विलोम शब्द है:', options: ['ठंडा', 'उष्ण', 'शीतल', 'हिम'], correctIndex: 1, explanation: 'शीत (ठंड) का विलोम: उष्ण/गर्म।' },

  // ══════════════════════════════════════════
  // तत्सम–तद्भव (Sanskrit ↔ Hindi) — 35 questions
  // ══════════════════════════════════════════
  { topic: 'tatsam-tadbhav', question: '"दुग्ध" का तद्भव रूप क्या है?', options: ['दही', 'घी', 'दूध', 'मक्खन'], correctIndex: 2, explanation: 'तत्सम: दुग्ध → तद्भव: दूध।' },
  { topic: 'tatsam-tadbhav', question: '"अग्नि" का तद्भव रूप क्या है?', options: ['धूप', 'आग', 'ज्वाला', 'दीपक'], correctIndex: 1, explanation: 'तत्सम: अग्नि → तद्भव: आग।' },
  { topic: 'tatsam-tadbhav', question: '"हस्त" का तद्भव रूप क्या है?', options: ['पैर', 'हाथ', 'मुँह', 'आँख'], correctIndex: 1, explanation: 'तत्सम: हस्त → तद्भव: हाथ।' },
  { topic: 'tatsam-tadbhav', question: '"कर्ण" का तद्भव रूप क्या है?', options: ['आँख', 'नाक', 'कान', 'मुँह'], correctIndex: 2, explanation: 'तत्सम: कर्ण → तद्भव: कान।' },
  { topic: 'tatsam-tadbhav', question: '"दंत" का तद्भव रूप क्या है?', options: ['होंठ', 'जीभ', 'दाँत', 'गाल'], correctIndex: 2, explanation: 'तत्सम: दंत → तद्भव: दाँत।' },
  { topic: 'tatsam-tadbhav', question: '"पाद" का तद्भव रूप क्या है?', options: ['हाथ', 'पाँव', 'घुटना', 'कमर'], correctIndex: 1, explanation: 'तत्सम: पाद → तद्भव: पाँव।' },
  { topic: 'tatsam-tadbhav', question: '"नासिका" का तद्भव रूप क्या है?', options: ['कान', 'आँख', 'नाक', 'मुँह'], correctIndex: 2, explanation: 'तत्सम: नासिका → तद्भव: नाक।' },
  { topic: 'tatsam-tadbhav', question: '"ग्राम" का तद्भव रूप क्या है?', options: ['शहर', 'गाँव', 'नगर', 'मोहल्ला'], correctIndex: 1, explanation: 'तत्सम: ग्राम → तद्भव: गाँव।' },
  { topic: 'tatsam-tadbhav', question: '"चंद्र" का तद्भव रूप क्या है?', options: ['सूरज', 'तारा', 'चाँद', 'ग्रह'], correctIndex: 2, explanation: 'तत्सम: चंद्र → तद्भव: चाँद।' },
  { topic: 'tatsam-tadbhav', question: '"क्षेत्र" का तद्भव रूप क्या है?', options: ['खेत', 'वन', 'बाग', 'मैदान'], correctIndex: 0, explanation: 'तत्सम: क्षेत्र → तद्भव: खेत।' },
  { topic: 'tatsam-tadbhav', question: '"क्षीर" का तद्भव रूप क्या है?', options: ['पानी', 'तेल', 'खीर', 'दही'], correctIndex: 2, explanation: 'तत्सम: क्षीर → तद्भव: खीर।' },
  { topic: 'tatsam-tadbhav', question: '"भ्राता" का तद्भव रूप क्या है?', options: ['बहन', 'भाई', 'पिता', 'माता'], correctIndex: 1, explanation: 'तत्सम: भ्राता → तद्भव: भाई।' },
  { topic: 'tatsam-tadbhav', question: '"मातृ" का तद्भव रूप क्या है?', options: ['मामा', 'माँ', 'मौसी', 'नानी'], correctIndex: 1, explanation: 'तत्सम: मातृ → तद्भव: माँ।' },
  { topic: 'tatsam-tadbhav', question: '"सर्प" का तद्भव रूप क्या है?', options: ['बिच्छू', 'साँप', 'छिपकली', 'मेंढक'], correctIndex: 1, explanation: 'तत्सम: सर्प → तद्भव: साँप।' },
  { topic: 'tatsam-tadbhav', question: '"स्वर्ण" का तद्भव रूप क्या है?', options: ['चाँदी', 'सोना', 'ताँबा', 'लोहा'], correctIndex: 1, explanation: 'तत्सम: स्वर्ण → तद्भव: सोना।' },
  { topic: 'tatsam-tadbhav', question: '"वर्ष" का तद्भव रूप क्या है?', options: ['महीना', 'सप्ताह', 'बरस', 'दिन'], correctIndex: 2, explanation: 'तत्सम: वर्ष → तद्भव: बरस।' },
  { topic: 'tatsam-tadbhav', question: '"काष्ठ" का तद्भव रूप क्या है?', options: ['पत्थर', 'मिट्टी', 'काठ', 'धातु'], correctIndex: 2, explanation: 'तत्सम: काष्ठ → तद्भव: काठ/लकड़ी।' },
  { topic: 'tatsam-tadbhav', question: '"दीप" का तद्भव रूप क्या है?', options: ['मोमबत्ती', 'दिया', 'लालटेन', 'बत्ती'], correctIndex: 1, explanation: 'तत्सम: दीप → तद्भव: दिया।' },
  { topic: 'tatsam-tadbhav', question: '"कर्म" का तद्भव रूप क्या है?', options: ['क्रिया', 'काम', 'कार्य', 'कृत्य'], correctIndex: 1, explanation: 'तत्सम: कर्म → तद्भव: काम।' },
  { topic: 'tatsam-tadbhav', question: '"नयन" का तत्सम रूप क्या है?', options: ['आँख', 'नेत्र', 'लोचन', 'दृग'], correctIndex: 1, explanation: 'तद्भव: नयन → तत्सम: नेत्र।' },
  { topic: 'tatsam-tadbhav', question: '"पूत" का तत्सम रूप क्या है?', options: ['पिता', 'पुत्र', 'भाई', 'पुत्री'], correctIndex: 1, explanation: 'तद्भव: पूत → तत्सम: पुत्र।' },
  { topic: 'tatsam-tadbhav', question: '"घर" का तत्सम रूप क्या है?', options: ['गृह', 'सदन', 'भवन', 'आवास'], correctIndex: 0, explanation: 'तद्भव: घर → तत्सम: गृह।' },
  { topic: 'tatsam-tadbhav', question: '"कपड़ा" का तत्सम रूप क्या है?', options: ['वस्त्र', 'चीर', 'अंबर', 'वसन'], correctIndex: 0, explanation: 'तद्भव: कपड़ा → तत्सम: कर्पट।' },
  { topic: 'tatsam-tadbhav', question: '"आग" का तत्सम रूप क्या है?', options: ['ज्वाला', 'अग्नि', 'अनल', 'दहन'], correctIndex: 1, explanation: 'तद्भव: आग → तत्सम: अग्नि।' },
  { topic: 'tatsam-tadbhav', question: '"दाँत" का तत्सम रूप क्या है?', options: ['दंष्ट्र', 'दंत', 'दशन', 'दंतुल'], correctIndex: 1, explanation: 'तद्भव: दाँत → तत्सम: दंत।' },
  { topic: 'tatsam-tadbhav', question: '"काम" (work) का तत्सम रूप क्या है?', options: ['कर्म', 'कृत्य', 'कार्य', 'कृति'], correctIndex: 2, explanation: 'तद्भव: काम → तत्सम: कार्य।' },

  // ══════════════════════════════════════════
  // मुहावरे (Idioms) — 50 questions
  // ══════════════════════════════════════════
  { topic: 'muhavare', question: '"आँखें चुराना" मुहावरे का अर्थ है:', options: ['आँख में दर्द होना', 'सामना न करना', 'चोरी करना', 'झूठ बोलना'], correctIndex: 1, explanation: 'आँखें चुराना = किसी का सामना न करना, नजर बचाना।' },
  { topic: 'muhavare', question: '"अंगूठा दिखाना" मुहावरे का अर्थ है:', options: ['प्रशंसा करना', 'मना करना', 'रास्ता दिखाना', 'सहायता करना'], correctIndex: 1, explanation: 'अंगूठा दिखाना = साफ मना कर देना।' },
  { topic: 'muhavare', question: '"कान खड़े होना" मुहावरे का अर्थ है:', options: ['कान में दर्द होना', 'सतर्क हो जाना', 'सुनाई न देना', 'ध्यान न देना'], correctIndex: 1, explanation: 'कान खड़े होना = सावधान/सतर्क हो जाना।' },
  { topic: 'muhavare', question: '"नाक में दम करना" मुहावरे का अर्थ है:', options: ['नाक बंद होना', 'बहुत परेशान करना', 'खुश करना', 'रुलाना'], correctIndex: 1, explanation: 'नाक में दम करना = बहुत परेशान या तंग करना।' },
  { topic: 'muhavare', question: '"हाथ-पाँव फूलना" मुहावरे का अर्थ है:', options: ['बीमार होना', 'घबरा जाना', 'थक जाना', 'ठंड लगना'], correctIndex: 1, explanation: 'हाथ-पाँव फूलना = अत्यधिक घबरा जाना।' },
  { topic: 'muhavare', question: '"दाँत खट्टे करना" मुहावरे का अर्थ है:', options: ['खट्टा खाना', 'बुरी तरह हरा देना', 'दाँत दुखना', 'कड़वा लगना'], correctIndex: 1, explanation: 'दाँत खट्टे करना = बुरी तरह परेशान करना / हरा देना।' },
  { topic: 'muhavare', question: '"लाल-पीला होना" मुहावरे का अर्थ है:', options: ['रंग बदलना', 'क्रोधित होना', 'बीमार होना', 'प्रसन्न होना'], correctIndex: 1, explanation: 'लाल-पीला होना = बहुत क्रोधित होना।' },
  { topic: 'muhavare', question: '"तिल का ताड़ बनाना" मुहावरे का अर्थ है:', options: ['पेड़ लगाना', 'छोटी बात को बढ़ा-चढ़ाकर कहना', 'तिल खाना', 'बड़ा काम करना'], correctIndex: 1, explanation: 'तिल का ताड़ बनाना = बात को बढ़ा-चढ़ाकर पेश करना।' },
  { topic: 'muhavare', question: '"नौ दो ग्यारह होना" मुहावरे का अर्थ है:', options: ['गिनती करना', 'भाग जाना', 'लड़ाई करना', 'खेलना'], correctIndex: 1, explanation: 'नौ दो ग्यारह होना = चुपके से भाग जाना।' },
  { topic: 'muhavare', question: '"आँखों में धूल झोंकना" मुहावरे का अर्थ है:', options: ['आँखें खराब करना', 'धोखा देना', 'आँख साफ करना', 'धूल हटाना'], correctIndex: 1, explanation: 'आँखों में धूल झोंकना = धोखा देना / ठगना।' },
  { topic: 'muhavare', question: '"छाती पर मूँग दलना" मुहावरे का अर्थ है:', options: ['खाना पकाना', 'सामने रहकर कष्ट देना', 'सोना', 'खेत जोतना'], correctIndex: 1, explanation: 'छाती पर मूँग दलना = सामने रहते हुए तकलीफ देना।' },
  { topic: 'muhavare', question: '"ईंट से ईंट बजाना" मुहावरे का अर्थ है:', options: ['घर बनाना', 'बर्बाद कर देना', 'लड़ाई करना', 'मरम्मत करना'], correctIndex: 1, explanation: 'ईंट से ईंट बजाना = पूरी तरह नष्ट कर देना।' },
  { topic: 'muhavare', question: '"बाल की खाल निकालना" मुहावरे का अर्थ है:', options: ['बाल काटना', 'बहुत बारीकी से जाँचना', 'चोट करना', 'परेशान करना'], correctIndex: 1, explanation: 'बाल की खाल निकालना = छोटी-छोटी बातों पर व्यर्थ बहस करना।' },
  { topic: 'muhavare', question: '"घर का भेदी लंका ढाए" का अर्थ है:', options: ['घर छोड़ना', 'अपनों का भेद बाहर देने से हानि होती है', 'लंका जाना', 'राज छुपाना'], correctIndex: 1, explanation: 'अपने घर का भेद बाहर देने वाला सबसे बड़ा नुकसान करता है।' },
  { topic: 'muhavare', question: '"दो नावों पर पाँव रखना" का अर्थ है:', options: ['तैरना', 'दो काम एक साथ करना', 'अस्थिर नीति रखना', 'नाव चलाना'], correctIndex: 2, explanation: 'दो नावों पर पाँव रखना = एक साथ दो विरोधी दलों/कामों में रहना।' },
  { topic: 'muhavare', question: '"मुँह में पानी आना" का अर्थ है:', options: ['प्यास लगना', 'किसी चीज की बहुत इच्छा होना', 'बीमार होना', 'पानी पीना'], correctIndex: 1, explanation: 'मुँह में पानी आना = किसी चीज को देखकर तीव्र इच्छा होना।' },
  { topic: 'muhavare', question: '"अपनी खिचड़ी अलग पकाना" का अर्थ है:', options: ['अकेले खाना खाना', 'सबसे अलग चलना', 'खाना बनाना', 'किसी की मदद न करना'], correctIndex: 1, explanation: 'अपनी खिचड़ी अलग पकाना = दूसरों से मिलकर न चलना।' },
  { topic: 'muhavare', question: '"खून पसीना एक करना" का अर्थ है:', options: ['चोट लगना', 'कड़ी मेहनत करना', 'लड़ाई करना', 'बीमार पड़ना'], correctIndex: 1, explanation: 'खून पसीना एक करना = बहुत कठिन परिश्रम करना।' },
  { topic: 'muhavare', question: '"पेट में चूहे कूदना" का अर्थ है:', options: ['पेट में दर्द होना', 'बहुत भूख लगना', 'घबराहट होना', 'पेट खराब होना'], correctIndex: 1, explanation: 'पेट में चूहे कूदना = बहुत तेज भूख लगना।' },
  { topic: 'muhavare', question: '"कलेजे पर पत्थर रखना" का अर्थ है:', options: ['दिल में दर्द होना', 'कठिन काम करना', 'दुःख सहकर शांत रहना', 'पत्थर उठाना'], correctIndex: 2, explanation: 'कलेजे पर पत्थर रखना = दिल के दर्द को दबाकर धैर्य रखना।' },
  { topic: 'muhavare', question: '"चिकना घड़ा होना" का अर्थ है:', options: ['बर्तन धोना', 'किसी बात का असर न होना', 'चालाक होना', 'साफ होना'], correctIndex: 1, explanation: 'चिकना घड़ा = बेशर्म व्यक्ति जिस पर कोई बात असर न करे।' },
  { topic: 'muhavare', question: '"हाथ मलना" मुहावरे का अर्थ है:', options: ['हाथ साफ करना', 'पछताना', 'मेहनत करना', 'ताली बजाना'], correctIndex: 1, explanation: 'हाथ मलना = पछतावा करना।' },
  { topic: 'muhavare', question: '"आकाश-पाताल एक करना" का अर्थ है:', options: ['बहुत ऊँचा उड़ना', 'बहुत अधिक प्रयास करना', 'जमीन खोदना', 'मुश्किल काम करना'], correctIndex: 1, explanation: 'आकाश-पाताल एक करना = किसी काम के लिए पूरी शक्ति लगा देना।' },
  { topic: 'muhavare', question: '"नाक का बाल होना" का अर्थ है:', options: ['बहुत प्यारा होना', 'अक्लमंद होना', 'घमंडी होना', 'बेकार होना'], correctIndex: 0, explanation: 'नाक का बाल होना = बहुत प्रिय/करीबी होना।' },
  { topic: 'muhavare', question: '"टेढ़ी खीर होना" का अर्थ है:', options: ['मीठा होना', 'बहुत कठिन काम होना', 'स्वादिष्ट होना', 'आसान होना'], correctIndex: 1, explanation: 'टेढ़ी खीर होना = बहुत कठिन या पेचीदा काम होना।' },
  { topic: 'muhavare', question: '"कान भरना" मुहावरे का अर्थ है:', options: ['कान में पानी जाना', 'किसी के खिलाफ चुगली करना', 'ध्यान न देना', 'गाना सुनना'], correctIndex: 1, explanation: 'कान भरना = किसी के बारे में दूसरे के मन में गलत धारणा बनाना।' },
  { topic: 'muhavare', question: '"गागर में सागर भरना" का अर्थ है:', options: ['पानी भरना', 'थोड़े में बहुत कहना', 'समुद्र देखना', 'बड़ी बात करना'], correctIndex: 1, explanation: 'गागर में सागर भरना = कम शब्दों में बहुत अधिक कहना।' },
  { topic: 'muhavare', question: '"जले पर नमक छिड़कना" का अर्थ है:', options: ['घाव ठीक करना', 'दुखी व्यक्ति को और दुखाना', 'नमक लगाना', 'देखभाल करना'], correctIndex: 1, explanation: 'जले पर नमक छिड़कना = दुखी को और अधिक दुःख देना।' },
  { topic: 'muhavare', question: '"मन का मैल निकालना" का अर्थ है:', options: ['कपड़े धोना', 'मन की भावनाएँ प्रकट करना', 'सफाई करना', 'नहाना'], correctIndex: 1, explanation: 'मन का मैल निकालना = मन की संकुचित भावनाओं से मुक्त होना।' },
  { topic: 'muhavare', question: '"दाएँ हाथ का खेल होना" का अर्थ है:', options: ['खेल खेलना', 'बहुत आसान काम होना', 'हाथ से करना', 'दाएँ हाथ से लिखना'], correctIndex: 1, explanation: 'दाएँ हाथ का खेल होना = बहुत सरल काम होना।' },
  { topic: 'muhavare', question: '"आसमान से गिरे खजूर में अटके" का अर्थ है:', options: ['ऊँचाई पर होना', 'एक मुसीबत से निकलकर दूसरी में पड़ना', 'खजूर खाना', 'अटके रहना'], correctIndex: 1, explanation: 'एक परेशानी से निकलकर दूसरी में फँस जाना।' },

  // ══════════════════════════════════════════
  // एकार्थी / अनेकार्थी / एक शब्द (One-word) — 25 questions
  // ══════════════════════════════════════════
  { topic: 'one-word', question: '"जो कभी न मरे" के लिए एक शब्द है:', options: ['अमर', 'निर्बल', 'वृद्ध', 'शाश्वत'], correctIndex: 0, explanation: 'जो कभी न मरे = अमर।' },
  { topic: 'one-word', question: '"जो पढ़ा-लिखा न हो" के लिए एक शब्द है:', options: ['निरक्षर', 'मूर्ख', 'अज्ञानी', 'अनजान'], correctIndex: 0, explanation: 'पढ़ा-लिखा न होना = निरक्षर।' },
  { topic: 'one-word', question: '"जो देखा न जा सके" के लिए एक शब्द है:', options: ['अदृश्य', 'अज्ञात', 'अंधा', 'अंधेरा'], correctIndex: 0, explanation: 'देखा न जा सके = अदृश्य।' },
  { topic: 'one-word', question: '"जो ईश्वर में विश्वास न करे" के लिए एक शब्द है:', options: ['नास्तिक', 'आस्तिक', 'पापी', 'भक्त'], correctIndex: 0, explanation: 'ईश्वर में विश्वास न करना = नास्तिक।' },
  { topic: 'one-word', question: '"जो क्षमा के योग्य न हो" के लिए एक शब्द है:', options: ['अक्षम्य', 'दोषी', 'अपराधी', 'निर्दय'], correctIndex: 0, explanation: 'क्षमा के योग्य न हो = अक्षम्य।' },
  { topic: 'one-word', question: '"दूसरों की भलाई चाहने वाला" के लिए एक शब्द है:', options: ['परोपकारी', 'स्वार्थी', 'अहंकारी', 'लोभी'], correctIndex: 0, explanation: 'दूसरों की भलाई चाहना = परोपकारी।' },
  { topic: 'one-word', question: '"जो बिना वेतन के काम करे" के लिए एक शब्द है:', options: ['स्वयंसेवक', 'नौकर', 'अधिकारी', 'मजदूर'], correctIndex: 0, explanation: 'बिना वेतन काम करे = स्वयंसेवक।' },
  { topic: 'one-word', question: '"जो बात सब जानते हों" के लिए एक शब्द है:', options: ['जगजाहिर', 'गोपनीय', 'रहस्य', 'संकेत'], correctIndex: 0, explanation: 'सबको ज्ञात बात = जगजाहिर।' },
  { topic: 'one-word', question: '"जो सुना न जा सके" के लिए एक शब्द है:', options: ['अश्रव्य', 'बहरा', 'मूक', 'अज्ञात'], correctIndex: 0, explanation: 'सुना न जा सके = अश्रव्य।' },
  { topic: 'one-word', question: '"जो किसी का पक्ष न ले" के लिए एक शब्द है:', options: ['निष्पक्ष', 'कायर', 'मूर्ख', 'निरपराध'], correctIndex: 0, explanation: 'किसी का पक्ष न लेना = निष्पक्ष।' },
  { topic: 'one-word', question: '"जो पहले कभी न हुआ हो" के लिए एक शब्द है:', options: ['अभूतपूर्व', 'असाधारण', 'अनोखा', 'अद्भुत'], correctIndex: 0, explanation: 'पहले कभी न हुआ हो = अभूतपूर्व।' },
  { topic: 'one-word', question: '"जो एक ही समय में लिखा और पढ़ा जा सके" (नीले कमल) के लिए एक शब्द है:', options: ['राजीव', 'इंदीवर', 'कुमुद', 'पंकज'], correctIndex: 1, explanation: 'नीले कमल को इंदीवर कहते हैं।' },
  { topic: 'one-word', question: '"माता-पिता के बाद उनकी संपत्ति पर अधिकार पाने वाला" के लिए एक शब्द है:', options: ['उत्तराधिकारी', 'दानकर्ता', 'संरक्षक', 'वारिस'], correctIndex: 0, explanation: 'संपत्ति का अधिकारी = उत्तराधिकारी।' },
  { topic: 'one-word', question: '"जो बहुत कम बोलता हो" के लिए एक शब्द है:', options: ['मितभाषी', 'वाचाल', 'मूक', 'चुप्पा'], correctIndex: 0, explanation: 'कम बोलने वाला = मितभाषी।' },
  { topic: 'one-word', question: '"जो दोनों हाथों से समान काम कर सके" के लिए एक शब्द है:', options: ['सव्यसाची', 'कुशल', 'बहुगुणी', 'चतुर'], correctIndex: 0, explanation: 'दोनों हाथों से काम करने वाला = सव्यसाची।' },
  { topic: 'one-word', question: '"जो परलोक में विश्वास रखे" के लिए एक शब्द है:', options: ['आस्तिक', 'नास्तिक', 'धार्मिक', 'भक्त'], correctIndex: 0, explanation: 'परलोक में विश्वास रखे = आस्तिक।' },
  { topic: 'one-word', question: '"जिसका जन्म पहले हुआ हो" के लिए एक शब्द है:', options: ['अग्रज', 'अनुज', 'ज्येष्ठ', 'कनिष्ठ'], correctIndex: 0, explanation: 'पहले जन्मा = अग्रज (बड़ा भाई)।' },
  { topic: 'one-word', question: '"जो जंगल में रहे" के लिए एक शब्द है:', options: ['वनवासी', 'नगरवासी', 'ग्रामवासी', 'गिरिवासी'], correctIndex: 0, explanation: 'जंगल में रहने वाला = वनवासी।' },

  // ══════════════════════════════════════════
  // व्याकरण — लिंग, वचन, कारक, वर्णमाला (Grammar) — 40 questions
  // ══════════════════════════════════════════
  { topic: 'grammar', question: 'हिंदी वर्णमाला में स्वरों की संख्या कितनी है?', options: ['11', '13', '10', '16'], correctIndex: 0, explanation: 'हिंदी में 11 स्वर हैं: अ, आ, इ, ई, उ, ऊ, ऋ, ए, ऐ, ओ, औ।' },
  { topic: 'grammar', question: 'हिंदी वर्णमाला में कुल व्यंजनों की संख्या है:', options: ['52', '33', '36', '40'], correctIndex: 1, explanation: 'हिंदी में 33 मूल व्यंजन हैं।' },
  { topic: 'grammar', question: '"क, ख, ग, घ, ङ" किस वर्ग के व्यंजन हैं?', options: ['तवर्ग', 'कवर्ग', 'चवर्ग', 'पवर्ग'], correctIndex: 1, explanation: 'क से ङ तक = कवर्ग (कंठ से उच्चारित)।' },
  { topic: 'grammar', question: '"प, फ, ब, भ, म" किस वर्ग के व्यंजन हैं?', options: ['कवर्ग', 'तवर्ग', 'चवर्ग', 'पवर्ग'], correctIndex: 3, explanation: 'प से म तक = पवर्ग (ओष्ठ्य — होठों से उच्चारित)।' },
  { topic: 'grammar', question: 'अनुस्वार का चिह्न है:', options: ['ँ', 'ं', 'ः', '़'], correctIndex: 1, explanation: 'अनुस्वार का चिह्न है — ं (जैसे: संगीत)।' },
  { topic: 'grammar', question: 'विसर्ग का चिह्न है:', options: ['ं', 'ँ', 'ः', 'ऽ'], correctIndex: 2, explanation: 'विसर्ग का चिह्न है — ः (जैसे: दुःख, प्रातः)।' },
  { topic: 'grammar', question: 'निम्न में से "कंठ्य" (कंठ से बोला जाने वाला) वर्ण है:', options: ['प', 'क', 'च', 'ट'], correctIndex: 1, explanation: 'क, ख, ग, घ, ङ — कंठ से उच्चारित होते हैं।' },
  { topic: 'grammar', question: '"लड़का" शब्द का स्त्रीलिंग है:', options: ['लड़की', 'लड़काइन', 'लड़किया', 'लड़काइन'], correctIndex: 0, explanation: 'लड़का → स्त्रीलिंग: लड़की।' },
  { topic: 'grammar', question: '"पुस्तक" शब्द किस लिंग का है?', options: ['पुल्लिंग', 'स्त्रीलिंग', 'नपुंसकलिंग', 'उभयलिंग'], correctIndex: 1, explanation: 'पुस्तक — स्त्रीलिंग।' },
  { topic: 'grammar', question: '"घर" शब्द का बहुवचन है:', options: ['घरों', 'घरे', 'घर', 'घरें'], correctIndex: 2, explanation: 'घर — अकारांत पुल्लिंग, बहुवचन: घर (वही रहता है)।' },
  { topic: 'grammar', question: '"पुस्तक" का बहुवचन है:', options: ['पुस्तकें', 'पुस्तकाएँ', 'पुस्तकों', 'पुस्तके'], correctIndex: 0, explanation: 'पुस्तक → बहुवचन: पुस्तकें।' },
  { topic: 'grammar', question: '"राम ने सेब खाया" — इस वाक्य में "राम" किस कारक में है?', options: ['कर्म कारक', 'कर्ता कारक', 'करण कारक', 'सम्प्रदान कारक'], correctIndex: 1, explanation: 'काम करने वाला = कर्ता। "ने" कर्ता का परसर्ग है।' },
  { topic: 'grammar', question: '"राम के लिए खाना लाओ" — "के लिए" किस कारक का चिह्न है?', options: ['करण', 'सम्प्रदान', 'अपादान', 'संबंध'], correctIndex: 1, explanation: '"के लिए" = सम्प्रदान कारक (जिसे कुछ दिया जाए)।' },
  { topic: 'grammar', question: '"पेड़ से पत्ते गिरे" — "पेड़ से" किस कारक में है?', options: ['करण', 'सम्प्रदान', 'अपादान', 'संबंध'], correctIndex: 2, explanation: '"से" जब अलगाव दर्शाए = अपादान कारक।' },
  { topic: 'grammar', question: '"वह गाना गाती है" — इस वाक्य में क्रिया का काल है:', options: ['भूतकाल', 'भविष्यकाल', 'वर्तमान काल', 'संदिग्ध वर्तमान'], correctIndex: 2, explanation: '"गाती है" = सामान्य वर्तमान काल।' },
  { topic: 'grammar', question: 'निम्न में से "अव्यय" (अविकारी) शब्द कौन सा है?', options: ['सुंदर', 'तेज', 'यहाँ', 'पुस्तक'], correctIndex: 2, explanation: 'यहाँ = क्रियाविशेषण अव्यय (लिंग, वचन, कारक से नहीं बदलता)।' },
  { topic: 'grammar', question: '"मोहन पुस्तक पढ़ता है" — वाक्य का प्रकार है:', options: ['प्रश्नवाचक', 'आज्ञावाचक', 'सरल कथनवाचक', 'संदेहवाचक'], correctIndex: 2, explanation: 'सामान्य तथ्य बताने वाला = सरल/विधिवाचक वाक्य।' },
  { topic: 'grammar', question: '"खाना" शब्द में उपसर्ग और प्रत्यय क्या है?', options: ['कोई नहीं', 'उपसर्ग: ख, प्रत्यय: ना', 'प्रत्यय: ना', 'उपसर्ग: खा'], correctIndex: 2, explanation: '"खाना" में धातु "खा" + प्रत्यय "ना"।' },
  { topic: 'grammar', question: '"अनपढ़" में उपसर्ग है:', options: ['अन', 'अप', 'अनप', 'न'], correctIndex: 0, explanation: '"अन" उपसर्ग (नकारात्मक अर्थ देता है)।' },
  { topic: 'grammar', question: '"सच्चिदानंद" में कौन सी संधि है?', options: ['दीर्घ स्वर संधि', 'गुण संधि', 'यण संधि', 'वृद्धि संधि'], correctIndex: 0, explanation: 'सत् + चित् + आनंद — अ + इ = ए (दीर्घ)। यह दीर्घ स्वर संधि का उदाहरण है।' },
  { topic: 'grammar', question: '"राज + नीति" से बना शब्द है:', options: ['राजनिति', 'राजनीति', 'राजनेति', 'राजनीत'], correctIndex: 1, explanation: 'राज + नीति = राजनीति (तत्पुरुष समास)।' },
  { topic: 'grammar', question: '"देशभक्ति" में कौन सा समास है?', options: ['द्विगु', 'तत्पुरुष', 'बहुव्रीहि', 'कर्मधारय'], correctIndex: 1, explanation: 'देश की भक्ति = देशभक्ति → षष्ठी तत्पुरुष समास।' },
  { topic: 'grammar', question: '"नीलकंठ" में कौन सा समास है?', options: ['तत्पुरुष', 'द्विगु', 'बहुव्रीहि', 'कर्मधारय'], correctIndex: 2, explanation: 'नीला है कंठ जिसका (शिव) = बहुव्रीहि समास।' },
  { topic: 'grammar', question: '"पंचवटी" में कौन सा समास है?', options: ['तत्पुरुष', 'द्विगु', 'कर्मधारय', 'द्वंद्व'], correctIndex: 1, explanation: 'पाँच वटों का समूह = पंचवटी → द्विगु समास (संख्यावाचक)।' },
  { topic: 'grammar', question: '"सीता-राम" में कौन सा समास है?', options: ['तत्पुरुष', 'बहुव्रीहि', 'द्वंद्व', 'अव्ययीभाव'], correctIndex: 2, explanation: 'सीता और राम = सीता-राम → द्वंद्व समास (दोनों पद प्रधान)।' },
  { topic: 'grammar', question: 'निम्न में से शुद्ध वर्तनी (Correct Spelling) है:', options: ['कवियत्री', 'कवियित्री', 'कवयित्री', 'कवियत्रि'], correctIndex: 2, explanation: 'सही वर्तनी = कवयित्री।' },
  { topic: 'grammar', question: '"उसने मुझे बुलाया था" — में कौन सा काल है?', options: ['सामान्य भूत', 'आसन्न भूत', 'पूर्ण भूत', 'अपूर्ण भूत'], correctIndex: 2, explanation: '"बुलाया था" = पूर्ण भूत काल।' },
  { topic: 'grammar', question: 'निम्न वाक्य का शुद्ध रूप क्या है — "मुझे प्यास लगी है।"', options: ['मुझे प्यास लगा है।', 'मुझे प्यास लगी है।', 'मुझे प्यास लगे है।', 'मुझे प्यास लगती है।'], correctIndex: 1, explanation: '"प्यास" स्त्रीलिंग है, इसलिए "लगी है" शुद्ध है।' },
  { topic: 'grammar', question: '"वह रोज सुबह दौड़ता है" में क्रिया का प्रकार है:', options: ['सकर्मक', 'अकर्मक', 'द्विकर्मक', 'प्रेरणार्थक'], correctIndex: 1, explanation: '"दौड़ना" अकर्मक क्रिया है — इसका कर्म नहीं होता।' },
  { topic: 'grammar', question: '"सुन्दर" शब्द व्याकरण में क्या है?', options: ['संज्ञा', 'क्रिया', 'विशेषण', 'अव्यय'], correctIndex: 2, explanation: 'सुंदर = विशेषण (संज्ञा की विशेषता बताता है)।' },

  // ══════════════════════════════════════════
  // प्रसिद्ध लेखक और उनकी रचनाएँ (Authors & Works) — 25 questions
  // ══════════════════════════════════════════
  { topic: 'authors', question: '"गोदान" उपन्यास के लेखक कौन हैं?', options: ['जयशंकर प्रसाद', 'मुंशी प्रेमचंद', 'महादेवी वर्मा', 'रामधारी सिंह दिनकर'], correctIndex: 1, explanation: '"गोदान" (1936) — मुंशी प्रेमचंद की सर्वश्रेष्ठ कृति।' },
  { topic: 'authors', question: '"कामायनी" महाकाव्य के रचयिता कौन हैं?', options: ['तुलसीदास', 'सूरदास', 'जयशंकर प्रसाद', 'मैथिलीशरण गुप्त'], correctIndex: 2, explanation: '"कामायनी" (1936) — जयशंकर प्रसाद की महान कृति।' },
  { topic: 'authors', question: '"रामचरितमानस" की रचना किसने की?', options: ['वाल्मीकि', 'तुलसीदास', 'सूरदास', 'कबीरदास'], correctIndex: 1, explanation: '"रामचरितमानस" — गोस्वामी तुलसीदास (16वीं सदी)।' },
  { topic: 'authors', question: '"सूरसागर" के रचयिता कौन हैं?', options: ['तुलसीदास', 'कबीरदास', 'सूरदास', 'मीराबाई'], correctIndex: 2, explanation: '"सूरसागर" — महाकवि सूरदास (भक्तिकाल)।' },
  { topic: 'authors', question: '"मधुशाला" के रचयिता कौन हैं?', options: ['रामधारी सिंह दिनकर', 'हरिवंशराय बच्चन', 'महादेवी वर्मा', 'सुमित्रानंदन पंत'], correctIndex: 1, explanation: '"मधुशाला" (1935) — हरिवंशराय बच्चन।' },
  { topic: 'authors', question: '"उर्वशी" महाकाव्य के लेखक कौन हैं?', options: ['जयशंकर प्रसाद', 'रामधारी सिंह दिनकर', 'सुमित्रानंदन पंत', 'महादेवी वर्मा'], correctIndex: 1, explanation: '"उर्वशी" — रामधारी सिंह दिनकर को इस पर ज्ञानपीठ पुरस्कार मिला।' },
  { topic: 'authors', question: '"यामा" कविता संग्रह के लिए ज्ञानपीठ पुरस्कार किसे मिला?', options: ['सुमित्रानंदन पंत', 'रामधारी सिंह दिनकर', 'महादेवी वर्मा', 'हरिवंशराय बच्चन'], correctIndex: 2, explanation: '"यामा" — महादेवी वर्मा (1982 में ज्ञानपीठ)।' },
  { topic: 'authors', question: '"निराला" का पूरा नाम क्या था?', options: ['सूर्यकांत त्रिपाठी', 'रामकुमार त्रिपाठी', 'महेश त्रिपाठी', 'शिव कुमार त्रिपाठी'], correctIndex: 0, explanation: 'सूर्यकांत त्रिपाठी "निराला" — छायावाद के प्रमुख कवि।' },
  { topic: 'authors', question: 'ज्ञानपीठ पुरस्कार किस क्षेत्र में दिया जाता है?', options: ['संगीत', 'विज्ञान', 'साहित्य', 'खेल'], correctIndex: 2, explanation: 'ज्ञानपीठ पुरस्कार — भारतीय साहित्य का सर्वोच्च पुरस्कार।' },
  { topic: 'authors', question: '"चंद्रकांता" उपन्यास के लेखक कौन हैं?', options: ['प्रेमचंद', 'देवकीनंदन खत्री', 'भारतेंदु हरिश्चंद्र', 'जयशंकर प्रसाद'], correctIndex: 1, explanation: '"चंद्रकांता" — देवकीनंदन खत्री (हिंदी का प्रसिद्ध तिलस्मी उपन्यास)।' },
  { topic: 'authors', question: '"साकेत" महाकाव्य के रचयिता कौन हैं?', options: ['मैथिलीशरण गुप्त', 'जयशंकर प्रसाद', 'तुलसीदास', 'रामधारी सिंह दिनकर'], correctIndex: 0, explanation: '"साकेत" — मैथिलीशरण गुप्त (राष्ट्रकवि)।' },
  { topic: 'authors', question: '"रश्मिरथी" के रचयिता कौन हैं?', options: ['जयशंकर प्रसाद', 'महादेवी वर्मा', 'रामधारी सिंह दिनकर', 'सुमित्रानंदन पंत'], correctIndex: 2, explanation: '"रश्मिरथी" — रामधारी सिंह दिनकर (कर्ण पर आधारित)।' },
  { topic: 'authors', question: '"किताब-उल-हिंद" के लेखक कौन हैं?', options: ['अमीर खुसरो', 'अलबरूनी', 'इब्नबतूता', 'बाबर'], correctIndex: 1, explanation: '"किताब-उल-हिंद" — अलबरूनी (11वीं सदी, भारत का विस्तृत विवरण)।' },
  { topic: 'authors', question: '"गीतांजलि" के लेखक कौन हैं?', options: ['मुंशी प्रेमचंद', 'जयशंकर प्रसाद', 'रवींद्रनाथ टैगोर', 'सुमित्रानंदन पंत'], correctIndex: 2, explanation: '"गीतांजलि" — रवींद्रनाथ टैगोर (1913 नोबेल पुरस्कार)।' },
  { topic: 'authors', question: '"नीड़ का निर्माण फिर" कविता के रचयिता कौन हैं?', options: ['सुमित्रानंदन पंत', 'हरिवंशराय बच्चन', 'महादेवी वर्मा', 'निराला'], correctIndex: 1, explanation: '"नीड़ का निर्माण फिर" — हरिवंशराय बच्चन।' },
  { topic: 'authors', question: 'हिंदी के "शेक्सपियर" किसे कहा जाता है?', options: ['मुंशी प्रेमचंद', 'जयशंकर प्रसाद', 'भारतेंदु हरिश्चंद्र', 'महावीर प्रसाद द्विवेदी'], correctIndex: 1, explanation: 'जयशंकर प्रसाद को हिंदी का शेक्सपियर कहा जाता है।' },
  { topic: 'authors', question: '"आधुनिक हिंदी साहित्य के पितामह" किसे कहा जाता है?', options: ['प्रेमचंद', 'भारतेंदु हरिश्चंद्र', 'महावीर प्रसाद द्विवेदी', 'तुलसीदास'], correctIndex: 1, explanation: 'भारतेंदु हरिश्चंद्र को आधुनिक हिंदी साहित्य का पितामह कहते हैं।' },
  { topic: 'authors', question: '"हिंदी साहित्य का इतिहास" किसने लिखा?', options: ['रामचंद्र शुक्ल', 'हजारीप्रसाद द्विवेदी', 'नामवर सिंह', 'डॉ. नगेंद्र'], correctIndex: 0, explanation: 'आचार्य रामचंद्र शुक्ल ने "हिंदी साहित्य का इतिहास" (1929) लिखा।' },

];

function dedupe(qs: HindiMCQ[]): HindiMCQ[] {
  const seen = new Set<string>();
  return qs.filter(q => {
    const key = q.question.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const hindiBank: HindiMCQ[] = dedupe([
  ..._staticHindiBank,
  ...getAllGeneratedHindiQuestions(),
]);

export function buildHindiQuiz(total: number, topic?: string): HindiMCQ[] {
  const pool = topic ? hindiBank.filter((q: HindiMCQ) => q.topic === topic) : hindiBank;
  if (pool.length === 0) return [];

  // Weighted topic sampling for mixed quiz
  if (!topic) {
    const topics: Record<string, number> = {
      paryayvachi: 2, vilom: 2, muhavare: 2,
      'tatsam-tadbhav': 1, 'one-word': 1, grammar: 2, authors: 1,
    };
    const totalWeight = Object.values(topics).reduce((a, b) => a + b, 0);
    const picked: HindiMCQ[] = [];

    for (const [t, w] of Object.entries(topics)) {
      const tPool = hindiBank.filter((q: HindiMCQ) => q.topic === t);
      const count = Math.round((w / totalWeight) * total);
      const sampled = [...tPool].sort(() => Math.random() - 0.5).slice(0, count);
      picked.push(...sampled);
    }

    if (picked.length < total) {
      const remaining = hindiBank.filter((q: HindiMCQ) => !picked.includes(q));
      picked.push(...[...remaining].sort(() => Math.random() - 0.5).slice(0, total - picked.length));
    }
    return [...picked].sort(() => Math.random() - 0.5).slice(0, total);
  }

  return [...pool].sort(() => Math.random() - 0.5).slice(0, total);
}

export function getHindiBankSize(): number {
  return hindiBank.length;
}
