import { MCQ } from './mcq';

export interface GSQuestion extends MCQ {
  topic: string;
}

export const gsBank: GSQuestion[] = [

  // ══════════════════════════════════════════
  // UP Special GK — 120 questions
  // ══════════════════════════════════════════

  // Geography & Rivers
  { topic: 'up-special', question: 'उत्तर प्रदेश की राजधानी कौन सी है?', options: ['आगरा', 'वाराणसी', 'लखनऊ', 'प्रयागराज'], correctIndex: 2, explanation: 'लखनऊ उत्तर प्रदेश की राजधानी है।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश का राज्य पशु कौन है?', options: ['शेर', 'हाथी', 'बारहसिंगा', 'गाय'], correctIndex: 2, explanation: 'बारहसिंगा (Swamp Deer) उत्तर प्रदेश का राज्य पशु है।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश का राज्य पक्षी कौन है?', options: ['मोर', 'तोता', 'सारस', 'कोयल'], correctIndex: 2, explanation: 'सारस (Sarus Crane) उत्तर प्रदेश का राज्य पक्षी है।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश का राज्य पुष्प कौन है?', options: ['गुलाब', 'कमल', 'पलाश', 'चमेली'], correctIndex: 2, explanation: 'पलाश (ढाक/टेसू) उत्तर प्रदेश का राज्य पुष्प है।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश का राज्य वृक्ष कौन है?', options: ['पीपल', 'बरगद', 'अशोक', 'नीम'], correctIndex: 2, explanation: 'अशोक वृक्ष उत्तर प्रदेश का राज्य वृक्ष है।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश में कुल कितने जिले हैं?', options: ['70', '72', '75', '80'], correctIndex: 2, explanation: 'उत्तर प्रदेश में 75 जिले हैं।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश में कुल कितने मंडल हैं?', options: ['15', '18', '20', '25'], correctIndex: 1, explanation: 'उत्तर प्रदेश में 18 मंडल हैं।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश की स्थापना दिवस कब मनाई जाती है?', options: ['15 अगस्त', '26 जनवरी', '1 नवंबर', '26 नवंबर'], correctIndex: 2, explanation: 'उत्तर प्रदेश स्थापना दिवस: 1 नवंबर।' },
  { topic: 'up-special', question: 'क्षेत्रफल की दृष्टि से उत्तर प्रदेश भारत में किस स्थान पर है?', options: ['दूसरे', 'चौथे', 'पाँचवें', 'तीसरे'], correctIndex: 1, explanation: 'क्षेत्रफल में UP चौथा सबसे बड़ा राज्य है।' },
  { topic: 'up-special', question: 'जनसंख्या की दृष्टि से उत्तर प्रदेश भारत में किस स्थान पर है?', options: ['पहले', 'दूसरे', 'तीसरे', 'चौथे'], correctIndex: 0, explanation: 'जनसंख्या में UP भारत का सबसे बड़ा राज्य है।' },
  { topic: 'up-special', question: 'गंगा नदी उत्तर प्रदेश के किस जिले से प्रवेश करती है?', options: ['वाराणसी', 'बिजनौर', 'मेरठ', 'सहारनपुर'], correctIndex: 1, explanation: 'गंगा UP में बिजनौर जिले से प्रवेश करती है।' },
  { topic: 'up-special', question: 'लखनऊ किस नदी के किनारे स्थित है?', options: ['गंगा', 'यमुना', 'गोमती', 'सरयू'], correctIndex: 2, explanation: 'लखनऊ गोमती नदी के किनारे स्थित है।' },
  { topic: 'up-special', question: 'आगरा किस नदी के किनारे स्थित है?', options: ['गंगा', 'यमुना', 'गोमती', 'चंबल'], correctIndex: 1, explanation: 'आगरा यमुना नदी के किनारे स्थित है।' },
  { topic: 'up-special', question: 'वाराणसी किस नदी के किनारे स्थित है?', options: ['यमुना', 'गोमती', 'गंगा', 'सरयू'], correctIndex: 2, explanation: 'वाराणसी (काशी) गंगा नदी के किनारे स्थित है।' },
  { topic: 'up-special', question: 'अयोध्या किस नदी के किनारे स्थित है?', options: ['गंगा', 'यमुना', 'सरयू', 'गोमती'], correctIndex: 2, explanation: 'अयोध्या सरयू (घाघरा) नदी के किनारे बसी है।' },
  { topic: 'up-special', question: 'गंगा और यमुना का संगम कहाँ होता है?', options: ['वाराणसी', 'मथुरा', 'प्रयागराज', 'कानपुर'], correctIndex: 2, explanation: 'गंगा-यमुना-सरस्वती का त्रिवेणी संगम प्रयागराज में है।' },

  // Monuments & Culture
  { topic: 'up-special', question: 'ताज महल कहाँ स्थित है?', options: ['लखनऊ', 'आगरा', 'वाराणसी', 'मथुरा'], correctIndex: 1, explanation: 'ताज महल आगरा में यमुना किनारे स्थित है।' },
  { topic: 'up-special', question: 'ताज महल किसने बनवाया था?', options: ['अकबर', 'बाबर', 'शाहजहाँ', 'औरंगजेब'], correctIndex: 2, explanation: 'ताज महल शाहजहाँ ने अपनी पत्नी मुमताज की याद में बनवाया।' },
  { topic: 'up-special', question: 'बड़ा इमामबाड़ा कहाँ स्थित है?', options: ['आगरा', 'लखनऊ', 'इलाहाबाद', 'बनारस'], correctIndex: 1, explanation: 'बड़ा इमामबाड़ा लखनऊ में आसफुद्दौला ने 1784 में बनवाया।' },
  { topic: 'up-special', question: 'सारनाथ कहाँ स्थित है?', options: ['मथुरा', 'अयोध्या', 'वाराणसी के पास', 'लखनऊ'], correctIndex: 2, explanation: 'सारनाथ वाराणसी के निकट है — यहाँ बुद्ध ने प्रथम उपदेश दिया।' },
  { topic: 'up-special', question: 'कुशीनगर किसलिए प्रसिद्ध है?', options: ['राम जन्मभूमि', 'बुद्ध की महापरिनिर्वाण स्थली', 'कृष्ण जन्मभूमि', 'जैन तीर्थ'], correctIndex: 1, explanation: 'कुशीनगर में महात्मा बुद्ध का महापरिनिर्वाण हुआ था।' },
  { topic: 'up-special', question: 'मथुरा किसकी जन्मभूमि है?', options: ['राम', 'कृष्ण', 'बुद्ध', 'महावीर'], correctIndex: 1, explanation: 'मथुरा भगवान श्रीकृष्ण की जन्मभूमि है।' },
  { topic: 'up-special', question: 'अयोध्या किसकी जन्मभूमि है?', options: ['कृष्ण', 'बुद्ध', 'राम', 'महावीर'], correctIndex: 2, explanation: 'अयोध्या भगवान राम की जन्मभूमि है।' },
  { topic: 'up-special', question: 'कुम्भ मेला UP में कहाँ आयोजित होता है?', options: ['वाराणसी', 'अयोध्या', 'प्रयागराज', 'मथुरा'], correctIndex: 2, explanation: 'कुम्भ मेला प्रयागराज (इलाहाबाद) में गंगा-यमुना-सरस्वती संगम पर।' },
  { topic: 'up-special', question: 'लठमार होली कहाँ खेली जाती है?', options: ['वृंदावन', 'बरसाना', 'मथुरा', 'आगरा'], correctIndex: 1, explanation: 'लठमार होली मथुरा के बरसाना में खेली जाती है।' },
  { topic: 'up-special', question: 'देव दीपावली कहाँ मनाई जाती है?', options: ['अयोध्या', 'मथुरा', 'वाराणसी', 'प्रयागराज'], correctIndex: 2, explanation: 'देव दीपावली वाराणसी के घाटों पर कार्तिक पूर्णिमा को।' },
  { topic: 'up-special', question: 'ताज महोत्सव कहाँ आयोजित होता है?', options: ['लखनऊ', 'आगरा', 'वाराणसी', 'मथुरा'], correctIndex: 1, explanation: 'ताज महोत्सव आगरा में हर साल फरवरी में आयोजित होता है।' },

  // UP Agriculture & Economy
  { topic: 'up-special', question: 'उत्तर प्रदेश किस फसल के उत्पादन में भारत में अग्रणी है?', options: ['चावल', 'गेहूँ', 'कपास', 'जूट'], correctIndex: 1, explanation: 'UP गेहूँ उत्पादन में भारत का अग्रणी राज्य है।' },
  { topic: 'up-special', question: 'UP में गन्ने से बनने वाला प्रमुख उत्पाद क्या है?', options: ['शराब', 'चीनी', 'सिरका', 'जूस'], correctIndex: 1, explanation: 'UP भारत का सबसे बड़ा चीनी उत्पादक राज्य है।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश का कौन सा जिला "चीनी का कटोरा" कहलाता है?', options: ['लखनऊ', 'आगरा', 'मुजफ्फरनगर', 'गोरखपुर'], correctIndex: 2, explanation: 'मुजफ्फरनगर को UP का चीनी कटोरा कहते हैं।' },
  { topic: 'up-special', question: 'आगरा किस उद्योग के लिए प्रसिद्ध है?', options: ['कपड़ा', 'चमड़ा उद्योग', 'इस्पात', 'सीमेंट'], correctIndex: 1, explanation: 'आगरा चमड़ा (जूता) उद्योग के लिए प्रसिद्ध है।' },
  { topic: 'up-special', question: 'वाराणसी किस कपड़े के लिए प्रसिद्ध है?', options: ['खादी', 'रेशम (बनारसी साड़ी)', 'ऊन', 'सूती'], correctIndex: 1, explanation: 'वाराणसी बनारसी रेशमी साड़ियों के लिए विश्वप्रसिद्ध है।' },
  { topic: 'up-special', question: 'UP का कौन सा जिला "पीतल नगरी" कहलाता है?', options: ['आगरा', 'वाराणसी', 'मुरादाबाद', 'लखनऊ'], correctIndex: 2, explanation: 'मुरादाबाद को "पीतल नगरी" कहते हैं (Brass City)।' },
  { topic: 'up-special', question: 'लखनऊ किस शिल्प कला के लिए प्रसिद्ध है?', options: ['मिट्टी के बर्तन', 'चिकनकारी', 'खादी', 'बाँस शिल्प'], correctIndex: 1, explanation: 'लखनऊ की चिकनकारी (कढ़ाई कला) विश्वप्रसिद्ध है।' },
  { topic: 'up-special', question: 'फिरोजाबाद किस उद्योग के लिए प्रसिद्ध है?', options: ['चाय', 'काँच (चूड़ियाँ)', 'कागज', 'रबर'], correctIndex: 1, explanation: 'फिरोजाबाद काँच की चूड़ियों के लिए प्रसिद्ध है।' },

  // UP Police & Administration
  { topic: 'up-special', question: 'UP पुलिस का मुख्यालय कहाँ है?', options: ['आगरा', 'लखनऊ', 'वाराणसी', 'प्रयागराज'], correctIndex: 1, explanation: 'UP पुलिस का मुख्यालय लखनऊ में है।' },
  { topic: 'up-special', question: 'UP पुलिस का सर्वोच्च अधिकारी कौन होता है?', options: ['SP', 'DIG', 'DGP', 'SSP'], correctIndex: 2, explanation: 'DGP (Director General of Police) UP पुलिस का सर्वोच्च अधिकारी होता है।' },
  { topic: 'up-special', question: 'PAC का पूरा नाम क्या है?', options: ['Police Action Corps', 'Provincial Armed Constabulary', 'Paramilitary Armed Corps', 'Police Armed Cadre'], correctIndex: 1, explanation: 'PAC = Provincial Armed Constabulary — UP पुलिस की सशस्त्र शाखा।' },
  { topic: 'up-special', question: 'UP पुलिस का आदर्श वाक्य क्या है?', options: ['सेवा ही धर्म', 'सर्वदा जनसेवा', 'सत्य मेव जयते', 'सुरक्षा — सहयोग — समन्वय'], correctIndex: 1, explanation: '"सर्वदा जनसेवा" UP पुलिस का आदर्श वाक्य है।' },
  { topic: 'up-special', question: 'जिले में पुलिस का प्रमुख अधिकारी कौन होता है?', options: ['DIG', 'SSP/SP', 'DGP', 'ASP'], correctIndex: 1, explanation: 'जिले में पुलिस प्रमुख: SSP (Senior Superintendent of Police) या SP।' },
  { topic: 'up-special', question: 'थाने का प्रमुख अधिकारी कौन होता है?', options: ['ASI', 'SHO (Sub-Inspector)', 'DSP', 'Inspector'], correctIndex: 1, explanation: 'SHO (Station House Officer) = थाने का प्रभारी।' },
  { topic: 'up-special', question: 'UP में राजस्व (Revenue) का सबसे छोटा इकाई क्या है?', options: ['तहसील', 'जिला', 'ग्राम', 'मंडल'], correctIndex: 2, explanation: 'राजस्व की सबसे छोटी इकाई ग्राम है।' },
  { topic: 'up-special', question: 'UP में एक जिले का प्रशासनिक प्रमुख कौन होता है?', options: ['SDM', 'DM (District Magistrate)', 'Commissioner', 'SP'], correctIndex: 1, explanation: 'DM (District Magistrate) / जिलाधिकारी जिले का प्रशासनिक प्रमुख होता है।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश विधान सभा में कुल कितनी सीटें हैं?', options: ['300', '403', '420', '450'], correctIndex: 1, explanation: 'UP विधान सभा में 403 सीटें हैं।' },
  { topic: 'up-special', question: 'UP से लोकसभा में कितनी सीटें हैं?', options: ['60', '70', '80', '90'], correctIndex: 2, explanation: 'UP से लोकसभा में 80 सीटें — सबसे अधिक।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश के प्रथम मुख्यमंत्री कौन थे?', options: ['चंद्रभानु गुप्त', 'गोविंद बल्लभ पंत', 'सुचेता कृपलानी', 'लाल बहादुर शास्त्री'], correctIndex: 1, explanation: 'गोविंद बल्लभ पंत UP के प्रथम मुख्यमंत्री (1950-54)।' },
  { topic: 'up-special', question: 'UP की प्रथम महिला मुख्यमंत्री कौन थीं?', options: ['उमा भारती', 'मायावती', 'सुचेता कृपलानी', 'सरोजिनी नायडू'], correctIndex: 2, explanation: 'सुचेता कृपलानी UP की प्रथम महिला मुख्यमंत्री थीं (1963-67)।' },

  // UP History
  { topic: 'up-special', question: '1857 की क्रांति की शुरुआत UP के किस स्थान से हुई?', options: ['लखनऊ', 'मेरठ', 'आगरा', 'कानपुर'], correctIndex: 1, explanation: '10 मई 1857 को मेरठ से 1857 की क्रांति की शुरुआत हुई।' },
  { topic: 'up-special', question: '"झाँसी की रानी" लक्ष्मीबाई का वास्तविक नाम क्या था?', options: ['मणिकर्णिका', 'गौरी', 'रानी दुर्गावती', 'अहिल्याबाई'], correctIndex: 0, explanation: 'रानी लक्ष्मीबाई का बचपन का नाम मणिकर्णिका था।' },
  { topic: 'up-special', question: 'चंद्रशेखर आजाद का जन्म किस प्रदेश में हुआ था?', options: ['बिहार', 'मध्यप्रदेश', 'उत्तर प्रदेश', 'राजस्थान'], correctIndex: 1, explanation: 'चंद्रशेखर आजाद का जन्म मध्यप्रदेश (अलीराजपुर) में हुआ लेकिन UP से जुड़े रहे।' },
  { topic: 'up-special', question: '"काकोरी कांड" (1925) किस प्रदेश में हुआ था?', options: ['बिहार', 'बंगाल', 'उत्तर प्रदेश', 'पंजाब'], correctIndex: 2, explanation: 'काकोरी कांड 9 अगस्त 1925 को UP के काकोरी में हुआ।' },
  { topic: 'up-special', question: 'उत्तर प्रदेश का सबसे बड़ा शहर (जनसंख्या) कौन सा है?', options: ['आगरा', 'कानपुर', 'लखनऊ', 'वाराणसी'], correctIndex: 1, explanation: 'कानपुर UP का सबसे अधिक जनसंख्या वाला शहर है।' },

  // ══════════════════════════════════════════
  // Indian Constitution & Polity — 60 questions
  // ══════════════════════════════════════════
  { topic: 'constitution', question: 'भारतीय संविधान कब लागू हुआ?', options: ['15 अगस्त 1947', '26 जनवरी 1950', '26 नवंबर 1949', '2 अक्तूबर 1948'], correctIndex: 1, explanation: 'भारतीय संविधान 26 जनवरी 1950 को लागू हुआ (गणतंत्र दिवस)।' },
  { topic: 'constitution', question: 'भारतीय संविधान सभा की पहली बैठक कब हुई?', options: ['9 दिसंबर 1946', '26 जनवरी 1950', '15 अगस्त 1947', '26 नवंबर 1949'], correctIndex: 0, explanation: 'संविधान सभा की पहली बैठक 9 दिसंबर 1946 को हुई।' },
  { topic: 'constitution', question: 'संविधान सभा के अध्यक्ष कौन थे?', options: ['जवाहरलाल नेहरू', 'डॉ. राजेंद्र प्रसाद', 'बी.आर. अंबेडकर', 'सरदार पटेल'], correctIndex: 1, explanation: 'डॉ. राजेंद्र प्रसाद संविधान सभा के अध्यक्ष थे।' },
  { topic: 'constitution', question: 'भारतीय संविधान की प्रारूप समिति के अध्यक्ष कौन थे?', options: ['जवाहरलाल नेहरू', 'डॉ. राजेंद्र प्रसाद', 'डॉ. बी.आर. अंबेडकर', 'सरदार पटेल'], correctIndex: 2, explanation: 'डॉ. भीमराव अंबेडकर प्रारूप समिति के अध्यक्ष थे — "संविधान के पिता"।' },
  { topic: 'constitution', question: 'भारत का संविधान कितने दिनों में तैयार हुआ?', options: ['1 वर्ष', '2 वर्ष 11 माह 18 दिन', '3 वर्ष', '5 वर्ष'], correctIndex: 1, explanation: 'संविधान बनाने में 2 वर्ष 11 माह 18 दिन लगे।' },
  { topic: 'constitution', question: 'भारतीय संविधान का अनुच्छेद 21 किससे संबंधित है?', options: ['भाषण की स्वतंत्रता', 'प्राण एवं दैहिक स्वतंत्रता', 'धर्म की स्वतंत्रता', 'समानता का अधिकार'], correctIndex: 1, explanation: 'अनुच्छेद 21: प्राण और दैहिक स्वतंत्रता का अधिकार।' },
  { topic: 'constitution', question: 'भारतीय संविधान का अनुच्छेद 19 किससे संबंधित है?', options: ['समानता का अधिकार', 'स्वतंत्रता के अधिकार', 'शोषण के विरुद्ध', 'धार्मिक स्वतंत्रता'], correctIndex: 1, explanation: 'अनुच्छेद 19: 6 प्रकार की स्वतंत्रताएँ (भाषण, सभा, संचरण आदि)।' },
  { topic: 'constitution', question: 'मौलिक अधिकार संविधान के किस भाग में हैं?', options: ['भाग II', 'भाग III', 'भाग IV', 'भाग V'], correctIndex: 1, explanation: 'मौलिक अधिकार संविधान के भाग III (अनुच्छेद 12–35) में हैं।' },
  { topic: 'constitution', question: 'नीति निर्देशक तत्व संविधान के किस भाग में हैं?', options: ['भाग III', 'भाग IV', 'भाग V', 'भाग VI'], correctIndex: 1, explanation: 'नीति निर्देशक तत्व भाग IV (अनुच्छेद 36–51) में हैं।' },
  { topic: 'constitution', question: 'भारत के प्रधानमंत्री की नियुक्ति कौन करता है?', options: ['लोकसभा अध्यक्ष', 'राष्ट्रपति', 'उप-राष्ट्रपति', 'सर्वोच्च न्यायालय'], correctIndex: 1, explanation: 'राष्ट्रपति प्रधानमंत्री की नियुक्ति करता है।' },
  { topic: 'constitution', question: 'राज्यसभा का सभापति कौन होता है?', options: ['राष्ट्रपति', 'प्रधानमंत्री', 'उप-राष्ट्रपति', 'लोकसभा अध्यक्ष'], correctIndex: 2, explanation: 'उप-राष्ट्रपति राज्यसभा का पदेन सभापति होता है।' },
  { topic: 'constitution', question: 'भारत के उच्चतम न्यायालय के मुख्य न्यायाधीश की नियुक्ति कौन करता है?', options: ['प्रधानमंत्री', 'राष्ट्रपति', 'कानून मंत्री', 'संसद'], correctIndex: 1, explanation: 'सर्वोच्च न्यायालय के मुख्य न्यायाधीश की नियुक्ति राष्ट्रपति करता है।' },
  { topic: 'constitution', question: 'भारत का राष्ट्रीय मानवाधिकार आयोग की स्थापना कब हुई?', options: ['1991', '1993', '1995', '1997'], correctIndex: 1, explanation: 'NHRC की स्थापना 12 अक्तूबर 1993 को हुई।' },
  { topic: 'constitution', question: 'संसद के कितने सदन हैं?', options: ['एक', 'दो', 'तीन', 'चार'], correctIndex: 1, explanation: 'भारतीय संसद के दो सदन: लोकसभा (निचला) और राज्यसभा (ऊपरी)।' },
  { topic: 'constitution', question: 'लोकसभा में अधिकतम कितने सदस्य हो सकते हैं?', options: ['543', '550', '552', '545'], correctIndex: 2, explanation: 'लोकसभा में अधिकतम 552 सदस्य हो सकते हैं (550 निर्वाचित + 2 मनोनीत)।' },
  { topic: 'constitution', question: 'भारत में "समान नागरिक संहिता" का प्रावधान किस अनुच्छेद में है?', options: ['अनुच्छेद 40', 'अनुच्छेद 44', 'अनुच्छेद 48', 'अनुच्छेद 51'], correctIndex: 1, explanation: 'अनुच्छेद 44: समान नागरिक संहिता (नीति निर्देशक तत्व)।' },
  { topic: 'constitution', question: 'भारत का संविधान किसे "भारत के नागरिकों का मौलिक दस्तावेज" कहा जाता है?', options: ['मनु स्मृति', 'संविधान की प्रस्तावना', 'नागरिकता अधिनियम', 'IPC'], correctIndex: 1, explanation: 'प्रस्तावना (Preamble) को संविधान की आत्मा/कुंजी कहते हैं।' },
  { topic: 'constitution', question: '"सूचना का अधिकार (RTI)" किस वर्ष लागू हुआ?', options: ['2003', '2005', '2007', '2009'], correctIndex: 1, explanation: 'RTI अधिनियम 2005 में लागू हुआ।' },
  { topic: 'constitution', question: 'भारत में मतदान की न्यूनतम आयु क्या है?', options: ['21 वर्ष', '18 वर्ष', '20 वर्ष', '25 वर्ष'], correctIndex: 1, explanation: '61वें संविधान संशोधन (1989) से मतदान आयु 21 से घटाकर 18 वर्ष की गई।' },
  { topic: 'constitution', question: '"आपातकाल" का प्रावधान संविधान के किस अनुच्छेद में है?', options: ['अनुच्छेद 352', 'अनुच्छेद 360', 'अनुच्छेद 356', 'अनुच्छेद 365'], correctIndex: 0, explanation: 'राष्ट्रीय आपातकाल: अनुच्छेद 352।' },

  // ══════════════════════════════════════════
  // Indian History (1857–1947) — 50 questions
  // ══════════════════════════════════════════
  { topic: 'history', question: '1857 की क्रांति को "सिपाही विद्रोह" किसने कहा?', options: ['भारतीय इतिहासकारों ने', 'ब्रिटिश इतिहासकारों ने', 'सावरकर ने', 'नेहरू ने'], correctIndex: 1, explanation: 'अंग्रेज इतिहासकारों ने इसे "सिपाही विद्रोह" कहा।' },
  { topic: 'history', question: '1857 की क्रांति का तात्कालिक कारण क्या था?', options: ['भारी कर', 'चर्बी वाले कारतूस', 'लैंड एक्ट', 'धार्मिक हस्तक्षेप'], correctIndex: 1, explanation: 'एनफील्ड राइफल के कारतूस में गाय-सूअर की चर्बी की अफवाह।' },
  { topic: 'history', question: 'भारतीय राष्ट्रीय कांग्रेस की स्थापना कब हुई?', options: ['1880', '1885', '1890', '1895'], correctIndex: 1, explanation: 'INC की स्थापना 28 दिसंबर 1885 को ए.ओ. ह्यूम ने की।' },
  { topic: 'history', question: 'भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?', options: ['दादाभाई नौरोजी', 'बाल गंगाधर तिलक', 'व्योमेशचंद्र बनर्जी', 'ए.ओ. ह्यूम'], correctIndex: 2, explanation: 'व्योमेशचंद्र बनर्जी (W.C. Banerjee) INC के प्रथम अध्यक्ष।' },
  { topic: 'history', question: 'बंगाल विभाजन (Partition of Bengal) कब हुआ?', options: ['1901', '1905', '1909', '1911'], correctIndex: 1, explanation: 'लॉर्ड कर्जन ने 1905 में बंगाल का विभाजन किया।' },
  { topic: 'history', question: '"स्वराज मेरा जन्मसिद्ध अधिकार है" किसने कहा?', options: ['महात्मा गांधी', 'बाल गंगाधर तिलक', 'लाला लाजपत राय', 'भगत सिंह'], correctIndex: 1, explanation: '"स्वराज मेरा जन्मसिद्ध अधिकार है" — बाल गंगाधर तिलक।' },
  { topic: 'history', question: 'जलियाँवाला बाग हत्याकांड कब हुआ?', options: ['1917', '1919', '1921', '1923'], correctIndex: 1, explanation: 'जलियाँवाला बाग हत्याकांड 13 अप्रैल 1919 को अमृतसर में।' },
  { topic: 'history', question: 'जलियाँवाला बाग हत्याकांड का आदेश किसने दिया?', options: ['लॉर्ड कर्जन', 'जनरल डायर', 'लॉर्ड माउंटबेटन', 'लॉर्ड इरविन'], correctIndex: 1, explanation: 'जनरल डायर ने निहत्थी भीड़ पर गोली चलाने का आदेश दिया।' },
  { topic: 'history', question: 'असहयोग आंदोलन कब शुरू हुआ?', options: ['1919', '1920', '1921', '1922'], correctIndex: 1, explanation: 'महात्मा गांधी ने 1920 में असहयोग आंदोलन शुरू किया।' },
  { topic: 'history', question: 'चौरा-चौरी कांड किस वर्ष हुआ?', options: ['1920', '1922', '1924', '1926'], correctIndex: 1, explanation: 'फरवरी 1922 में चौरा-चौरी (UP) में हिंसा के बाद गांधीजी ने असहयोग आंदोलन वापस लिया।' },
  { topic: 'history', question: 'भारत छोड़ो आंदोलन कब शुरू हुआ?', options: ['1940', '1942', '1943', '1944'], correctIndex: 1, explanation: '8 अगस्त 1942 को "भारत छोड़ो आंदोलन" शुरू हुआ।' },
  { topic: 'history', question: '"करो या मरो" का नारा किसने दिया?', options: ['भगत सिंह', 'सुभाष चंद्र बोस', 'महात्मा गांधी', 'लाल बहादुर शास्त्री'], correctIndex: 2, explanation: '"करो या मरो" — महात्मा गांधी (भारत छोड़ो आंदोलन, 1942)।' },
  { topic: 'history', question: 'दांडी मार्च (नमक सत्याग्रह) कब शुरू हुआ?', options: ['1929', '1930', '1932', '1934'], correctIndex: 1, explanation: '12 मार्च 1930 को गांधीजी ने दांडी यात्रा शुरू की।' },
  { topic: 'history', question: '"इंकलाब जिंदाबाद" का नारा किसने दिया?', options: ['महात्मा गांधी', 'भगत सिंह', 'सुभाष चंद्र बोस', 'लाला लाजपत राय'], correctIndex: 1, explanation: '"इंकलाब जिंदाबाद" — भगत सिंह।' },
  { topic: 'history', question: 'आजाद हिंद फौज (INA) की स्थापना किसने की?', options: ['भगत सिंह', 'सुभाष चंद्र बोस', 'लाला लाजपत राय', 'चंद्रशेखर आजाद'], correctIndex: 1, explanation: 'INA (Indian National Army) की स्थापना सुभाष चंद्र बोस ने 1943 में की।' },
  { topic: 'history', question: 'भारत की स्वतंत्रता कब मिली?', options: ['26 जनवरी 1950', '15 अगस्त 1947', '26 नवंबर 1949', '2 अक्तूबर 1947'], correctIndex: 1, explanation: 'भारत 15 अगस्त 1947 को स्वतंत्र हुआ।' },
  { topic: 'history', question: 'भारत के प्रथम प्रधानमंत्री कौन थे?', options: ['सरदार पटेल', 'डॉ. राजेंद्र प्रसाद', 'जवाहरलाल नेहरू', 'लाल बहादुर शास्त्री'], correctIndex: 2, explanation: 'जवाहरलाल नेहरू भारत के प्रथम प्रधानमंत्री (1947-1964)।' },
  { topic: 'history', question: 'भारत के प्रथम राष्ट्रपति कौन थे?', options: ['जवाहरलाल नेहरू', 'डॉ. राजेंद्र प्रसाद', 'डॉ. राधाकृष्णन', 'सरदार पटेल'], correctIndex: 1, explanation: 'डॉ. राजेंद्र प्रसाद भारत के प्रथम राष्ट्रपति (1950-1962)।' },
  { topic: 'history', question: 'Simon Commission (1927) का भारत में विरोध क्यों हुआ?', options: ['कर वृद्धि के कारण', 'इसमें कोई भारतीय सदस्य नहीं था', 'धार्मिक भेद', 'भाषा विवाद'], correctIndex: 1, explanation: 'Simon Commission में कोई भारतीय सदस्य नहीं था — इसीलिए "Simon Go Back" का नारा।' },
  { topic: 'history', question: '"सरफरोशी की तमन्ना" किसने लिखा?', options: ['भगत सिंह', 'रामप्रसाद बिस्मिल', 'चंद्रशेखर आजाद', 'सुभाष चंद्र बोस'], correctIndex: 1, explanation: '"सरफरोशी की तमन्ना" — रामप्रसाद बिस्मिल।' },

  // ══════════════════════════════════════════
  // Economy — GST, Demonetisation, Agriculture — 30 questions
  // ══════════════════════════════════════════
  { topic: 'economy', question: 'भारत में GST कब लागू हुआ?', options: ['1 अप्रैल 2017', '1 जुलाई 2017', '1 जनवरी 2018', '26 जनवरी 2017'], correctIndex: 1, explanation: 'GST (Goods & Services Tax) 1 जुलाई 2017 को लागू हुआ।' },
  { topic: 'economy', question: 'GST का पूरा नाम क्या है?', options: ['General Sales Tax', 'Goods and Services Tax', 'Government Service Tax', 'Gross Service Tax'], correctIndex: 1, explanation: 'GST = Goods and Services Tax (वस्तु एवं सेवा कर)।' },
  { topic: 'economy', question: 'GST में कितने स्लैब (दर) हैं?', options: ['3', '4', '5', '6'], correctIndex: 1, explanation: 'GST के 4 मुख्य स्लैब: 5%, 12%, 18%, 28%।' },
  { topic: 'economy', question: 'नोटबंदी (Demonetisation) कब की गई?', options: ['8 नवंबर 2016', '8 दिसंबर 2016', '8 अक्तूबर 2016', '8 जनवरी 2017'], correctIndex: 0, explanation: '8 नवंबर 2016 को PM मोदी ने ₹500 और ₹1000 के नोट बंद किए।' },
  { topic: 'economy', question: 'नोटबंदी के समय किन नोटों को बंद किया गया?', options: ['₹100 और ₹500', '₹500 और ₹1000', '₹1000 और ₹2000', '₹500 और ₹2000'], correctIndex: 1, explanation: '₹500 और ₹1000 के पुराने नोटों को बंद किया गया।' },
  { topic: 'economy', question: 'भारत में "हरित क्रांति" का जनक किसे माना जाता है?', options: ['डॉ. एम.एस. स्वामीनाथन', 'नॉर्मन बोरलॉग', 'वर्गीज कुरियन', 'जवाहरलाल नेहरू'], correctIndex: 0, explanation: 'हरित क्रांति (भारत) के जनक: डॉ. एम.एस. स्वामीनाथन।' },
  { topic: 'economy', question: '"श्वेत क्रांति" (White Revolution) का संबंध किससे है?', options: ['गेहूँ', 'दूध', 'चावल', 'कपास'], correctIndex: 1, explanation: 'श्वेत क्रांति = दुग्ध उत्पादन। जनक: वर्गीज कुरियन (Operation Flood)।' },
  { topic: 'economy', question: 'भारत की अर्थव्यवस्था किस प्रकार की है?', options: ['समाजवादी', 'पूँजीवादी', 'मिश्रित', 'साम्यवादी'], correctIndex: 2, explanation: 'भारत मिश्रित अर्थव्यवस्था (Mixed Economy) है।' },
  { topic: 'economy', question: 'GDP का पूरा नाम क्या है?', options: ['Gross Domestic Product', 'General Domestic Product', 'Gross Development Product', 'General Development Product'], correctIndex: 0, explanation: 'GDP = Gross Domestic Product (सकल घरेलू उत्पाद)।' },
  { topic: 'economy', question: '"जन धन योजना" किसलिए शुरू की गई?', options: ['किसानों के लिए ऋण', 'बैंकिंग सेवा से वंचितों को जोड़ना', 'महिला सशक्तिकरण', 'रोजगार के लिए'], correctIndex: 1, explanation: 'PM जन धन योजना — वित्तीय समावेशन के लिए, 28 अगस्त 2014।' },
  { topic: 'economy', question: 'MNREGA का पूरा नाम क्या है?', options: ['Mahatma National Rural Employment Guarantee Act', 'Mahatma Gandhi National Rural Employment Guarantee Act', 'Multinational Rural Employment Grant Act', 'Ministry of National Rural Employment Act'], correctIndex: 1, explanation: 'MNREGA = Mahatma Gandhi National Rural Employment Guarantee Act।' },
  { topic: 'economy', question: 'भारत का सबसे बड़ा व्यापारिक बैंक कौन सा है?', options: ['PNB', 'Bank of India', 'SBI', 'Canara Bank'], correctIndex: 2, explanation: 'SBI (State Bank of India) भारत का सबसे बड़ा सार्वजनिक क्षेत्र का बैंक।' },

  // ══════════════════════════════════════════
  // Science, Tech & Cybercrime — 30 questions
  // ══════════════════════════════════════════
  { topic: 'science', question: 'DNA का पूरा नाम क्या है?', options: ['Deoxyribose Nucleic Acid', 'Deoxyribonucleic Acid', 'Diribose Nucleic Acid', 'Double Nucleic Acid'], correctIndex: 1, explanation: 'DNA = Deoxyribonucleic Acid।' },
  { topic: 'science', question: 'प्रकाश की गति कितनी है?', options: ['3 × 10⁷ m/s', '3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10⁹ m/s'], correctIndex: 1, explanation: 'प्रकाश की गति = 3 × 10⁸ m/s (3 लाख km/s)।' },
  { topic: 'science', question: '"Phishing" क्या है?', options: ['मछली पकड़ना', 'धोखाधड़ी से जानकारी चुराना', 'सॉफ्टवेयर बनाना', 'इंटरनेट सर्फिंग'], correctIndex: 1, explanation: 'Phishing = फर्जी ईमेल/वेबसाइट से पासवर्ड/बैंक जानकारी चुराना।' },
  { topic: 'science', question: '"Malware" क्या है?', options: ['अच्छा सॉफ्टवेयर', 'हानिकारक सॉफ्टवेयर', 'एंटीवायरस', 'फायरवॉल'], correctIndex: 1, explanation: 'Malware = Malicious Software — कंप्यूटर को नुकसान पहुँचाने वाला।' },
  { topic: 'science', question: '"Ransomware" क्या करता है?', options: ['डेटा सुरक्षित करता है', 'फाइलें एन्क्रिप्ट करके फिरौती माँगता है', 'इंटरनेट स्पीड बढ़ाता है', 'वायरस हटाता है'], correctIndex: 1, explanation: 'Ransomware फाइलें lock करके पैसे की माँग करता है।' },
  { topic: 'science', question: 'भारत में साइबर अपराध की शिकायत कहाँ करें?', options: ['1930 हेल्पलाइन / cybercrime.gov.in', 'थाने में FIR', '100 नंबर', 'कोर्ट में'], correctIndex: 0, explanation: 'साइबर अपराध: 1930 हेल्पलाइन या cybercrime.gov.in पर।' },
  { topic: 'science', question: 'भारत का पहला उपग्रह कौन सा था?', options: ['INSAT-1', 'भास्कर', 'आर्यभट्ट', 'रोहिणी'], correctIndex: 2, explanation: '"आर्यभट्ट" — 19 अप्रैल 1975 को लॉन्च, भारत का पहला उपग्रह।' },
  { topic: 'science', question: 'ISRO का मुख्यालय कहाँ है?', options: ['मुंबई', 'बेंगलुरु', 'हैदराबाद', 'चेन्नई'], correctIndex: 1, explanation: 'ISRO का मुख्यालय बेंगलुरु (Bangalore) में है।' },
  { topic: 'science', question: 'चंद्रयान-3 मिशन कब सफल हुआ?', options: ['2021', '2022', '2023', '2024'], correctIndex: 2, explanation: 'चंद्रयान-3 ने 23 अगस्त 2023 को चाँद के दक्षिणी ध्रुव पर सफल लैंडिंग की।' },
  { topic: 'science', question: '"IT Act 2000" किससे संबंधित है?', options: ['आयकर', 'साइबर कानून', 'बैंकिंग', 'कृषि'], correctIndex: 1, explanation: 'IT Act 2000 = Information Technology Act — भारत का साइबर कानून।' },

  // ══════════════════════════════════════════
  // Countries, Capitals & Currencies — 25 questions
  // ══════════════════════════════════════════
  { topic: 'world-gk', question: 'चीन की राजधानी क्या है?', options: ['शंघाई', 'बीजिंग', 'हांगकांग', 'गुआंगझो'], correctIndex: 1, explanation: 'चीन की राजधानी बीजिंग (Beijing) है।' },
  { topic: 'world-gk', question: 'अमेरिका की राजधानी क्या है?', options: ['न्यूयॉर्क', 'लॉस एंजिल्स', 'वाशिंगटन D.C.', 'शिकागो'], correctIndex: 2, explanation: 'अमेरिका की राजधानी वाशिंगटन D.C. है।' },
  { topic: 'world-gk', question: 'पाकिस्तान की राजधानी क्या है?', options: ['कराची', 'लाहौर', 'इस्लामाबाद', 'रावलपिंडी'], correctIndex: 2, explanation: 'पाकिस्तान की राजधानी इस्लामाबाद है।' },
  { topic: 'world-gk', question: 'नेपाल की राजधानी क्या है?', options: ['पोखरा', 'काठमांडू', 'लुंबिनी', 'भरतपुर'], correctIndex: 1, explanation: 'नेपाल की राजधानी काठमांडू है।' },
  { topic: 'world-gk', question: 'जापान की मुद्रा क्या है?', options: ['डॉलर', 'युआन', 'येन', 'वोन'], correctIndex: 2, explanation: 'जापान की मुद्रा येन (Yen) है।' },
  { topic: 'world-gk', question: 'संयुक्त राष्ट्र (UN) का मुख्यालय कहाँ है?', options: ['लंदन', 'पेरिस', 'न्यूयॉर्क', 'जिनेवा'], correctIndex: 2, explanation: 'UN का मुख्यालय न्यूयॉर्क (USA) में है।' },
  { topic: 'world-gk', question: 'भारत के कितने देशों के साथ स्थलीय सीमाएँ लगती हैं?', options: ['5', '6', '7', '8'], correctIndex: 2, explanation: 'भारत की 7 देशों के साथ स्थलीय सीमा: पाक, अफगान, चीन, नेपाल, भूटान, बांग्लादेश, म्यांमार।' },
  { topic: 'world-gk', question: 'श्रीलंका की राजधानी क्या है?', options: ['कोलंबो', 'कैंडी', 'श्री जयवर्धनपुरा कोट्टे', 'गॉल'], correctIndex: 2, explanation: 'श्रीलंका की विधायी राजधानी श्री जयवर्धनपुरा कोट्टे है।' },
  { topic: 'world-gk', question: 'IMF का पूरा नाम क्या है?', options: ['International Money Fund', 'International Monetary Fund', 'Indian Money Fund', 'International Manufacturing Fund'], correctIndex: 1, explanation: 'IMF = International Monetary Fund (अंतर्राष्ट्रीय मुद्रा कोष)।' },
  { topic: 'world-gk', question: 'WHO का मुख्यालय कहाँ है?', options: ['न्यूयॉर्क', 'पेरिस', 'जिनेवा', 'लंदन'], correctIndex: 2, explanation: 'WHO (विश्व स्वास्थ्य संगठन) का मुख्यालय जिनेवा, स्विट्जरलैंड।' },

  // ══════════════════════════════════════════
  // Human Rights & Internal Security — 20 questions
  // ══════════════════════════════════════════
  { topic: 'security', question: 'NHRC का पूरा नाम क्या है?', options: ['National Human Rights Commission', 'National Human Resource Council', 'National Humanitarian Relief Corps', 'National Health Rights Commission'], correctIndex: 0, explanation: 'NHRC = National Human Rights Commission (राष्ट्रीय मानवाधिकार आयोग)।' },
  { topic: 'security', question: 'मानवाधिकार दिवस कब मनाया जाता है?', options: ['26 जनवरी', '10 दिसंबर', '15 अगस्त', '2 अक्तूबर'], correctIndex: 1, explanation: '10 दिसंबर = अंतर्राष्ट्रीय मानवाधिकार दिवस।' },
  { topic: 'security', question: 'POCSO Act किससे संबंधित है?', options: ['साइबर अपराध', 'बच्चों के यौन शोषण से सुरक्षा', 'आतंकवाद', 'भ्रष्टाचार'], correctIndex: 1, explanation: 'POCSO Act 2012 = Protection of Children from Sexual Offences Act।' },
  { topic: 'security', question: 'NIA का पूरा नाम क्या है?', options: ['National Investigation Agency', 'National Intelligence Authority', 'National Information Agency', 'National Internal Agency'], correctIndex: 0, explanation: 'NIA = National Investigation Agency — आतंकवाद जाँच एजेंसी।' },
  { topic: 'security', question: 'UAPA का संबंध किससे है?', options: ['भ्रष्टाचार', 'आतंकवाद विरोध', 'साइबर अपराध', 'चुनाव'], correctIndex: 1, explanation: 'UAPA = Unlawful Activities (Prevention) Act — गैरकानूनी गतिविधि निवारण अधिनियम।' },
  { topic: 'security', question: 'CBI का पूरा नाम क्या है?', options: ['Central Bureau of Inquiry', 'Central Bureau of Investigation', 'Criminal Bureau of India', 'Central Board of Investigation'], correctIndex: 1, explanation: 'CBI = Central Bureau of Investigation।' },
  { topic: 'security', question: 'IPC की धारा 302 किससे संबंधित है?', options: ['चोरी', 'हत्या', 'बलात्कार', 'धोखाधड़ी'], correctIndex: 1, explanation: 'IPC की धारा 302 हत्या (Murder) के लिए है।' },
  { topic: 'security', question: 'IPC की धारा 376 किससे संबंधित है?', options: ['डकैती', 'हत्या', 'बलात्कार', 'अपहरण'], correctIndex: 2, explanation: 'IPC की धारा 376 बलात्कार (Rape) के लिए है।' },
  { topic: 'security', question: '"Cyber Bullying" क्या है?', options: ['ऑनलाइन शॉपिंग', 'इंटरनेट पर किसी को परेशान/डराना', 'वायरस भेजना', 'हैकिंग'], correctIndex: 1, explanation: 'Cyber Bullying = इंटरनेट/सोशल मीडिया पर धमकाना या परेशान करना।' },
  { topic: 'security', question: 'FIR का पूरा नाम क्या है?', options: ['First Information Report', 'Final Investigation Report', 'First Inquiry Record', 'Federal Investigation Report'], correctIndex: 0, explanation: 'FIR = First Information Report (प्रथम सूचना रिपोर्ट)।' },

  // ══════════════════════════════════════════
  // Current Affairs / Important Days — 20 questions
  // ══════════════════════════════════════════
  { topic: 'current-affairs', question: 'गणतंत्र दिवस कब मनाया जाता है?', options: ['15 अगस्त', '26 जनवरी', '2 अक्तूबर', '14 नवंबर'], correctIndex: 1, explanation: '26 जनवरी 1950 को संविधान लागू हुआ — गणतंत्र दिवस।' },
  { topic: 'current-affairs', question: 'स्वतंत्रता दिवस कब मनाया जाता है?', options: ['26 जनवरी', '15 अगस्त', '2 अक्तूबर', '5 सितंबर'], correctIndex: 1, explanation: '15 अगस्त 1947 — स्वतंत्रता दिवस।' },
  { topic: 'current-affairs', question: 'राष्ट्रीय मतदाता दिवस कब मनाया जाता है?', options: ['25 जनवरी', '26 जनवरी', '1 जनवरी', '15 अगस्त'], correctIndex: 0, explanation: '25 जनवरी = राष्ट्रीय मतदाता दिवस (चुनाव आयोग स्थापना दिवस)।' },
  { topic: 'current-affairs', question: 'राष्ट्रीय पुलिस स्मृति दिवस कब मनाया जाता है?', options: ['21 अक्तूबर', '10 दिसंबर', '15 अगस्त', '26 जनवरी'], correctIndex: 0, explanation: '21 अक्तूबर = राष्ट्रीय पुलिस स्मृति दिवस।' },
  { topic: 'current-affairs', question: 'भारत का राष्ट्रीय खेल कौन सा है?', options: ['क्रिकेट', 'हॉकी', 'कबड्डी', 'बैडमिंटन'], correctIndex: 1, explanation: 'हॉकी भारत का राष्ट्रीय खेल है।' },
  { topic: 'current-affairs', question: 'भारत का राष्ट्रीय पशु कौन सा है?', options: ['शेर', 'हाथी', 'बाघ', 'गाय'], correctIndex: 2, explanation: 'बाघ (Tiger) भारत का राष्ट्रीय पशु है।' },
  { topic: 'current-affairs', question: 'भारत का राष्ट्रीय पक्षी कौन सा है?', options: ['कबूतर', 'तोता', 'मोर', 'हंस'], correctIndex: 2, explanation: 'मोर (Peacock) भारत का राष्ट्रीय पक्षी है।' },
  { topic: 'current-affairs', question: 'भारत का राष्ट्रगान "जन गण मन" किसने लिखा?', options: ['बंकिम चंद्र चटर्जी', 'रवींद्रनाथ टैगोर', 'सुभाष चंद्र बोस', 'सरोजिनी नायडू'], correctIndex: 1, explanation: 'राष्ट्रगान "जन गण मन" — रवींद्रनाथ टैगोर।' },
  { topic: 'current-affairs', question: '"वंदे मातरम्" किसने लिखा?', options: ['रवींद्रनाथ टैगोर', 'बंकिम चंद्र चटर्जी', 'मुंशी प्रेमचंद', 'सुभाष चंद्र बोस'], correctIndex: 1, explanation: '"वंदे मातरम्" — बंकिम चंद्र चटर्जी (उपन्यास "आनंदमठ" से)।' },
  { topic: 'current-affairs', question: 'भारत का राष्ट्रीय फूल कौन सा है?', options: ['गुलाब', 'कमल', 'चमेली', 'सूरजमुखी'], correctIndex: 1, explanation: 'कमल (Lotus) भारत का राष्ट्रीय पुष्प है।' },
];

export function buildGSQuiz(total: number, topic?: string): GSQuestion[] {
  const pool = topic ? gsBank.filter(q => q.topic === topic) : gsBank;
  if (pool.length === 0) return [];

  if (!topic) {
    const weights: Record<string, number> = {
      'up-special': 3,
      'constitution': 2,
      'history': 2,
      'economy': 1,
      'science': 1,
      'world-gk': 1,
      'security': 1,
      'current-affairs': 1,
    };
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    const picked: GSQuestion[] = [];

    for (const [t, w] of Object.entries(weights)) {
      const tPool = gsBank.filter(q => q.topic === t);
      const count = Math.round((w / totalWeight) * total);
      const sampled = [...tPool].sort(() => Math.random() - 0.5).slice(0, count);
      picked.push(...sampled);
    }

    if (picked.length < total) {
      const remaining = gsBank.filter(q => !picked.includes(q));
      picked.push(...[...remaining].sort(() => Math.random() - 0.5).slice(0, total - picked.length));
    }
    return [...picked].sort(() => Math.random() - 0.5).slice(0, total);
  }

  return [...pool].sort(() => Math.random() - 0.5).slice(0, total);
}

export function getGSBankSize(): number {
  return gsBank.length;
}
