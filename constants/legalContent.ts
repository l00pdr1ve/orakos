import { View, LegalContent } from '../types';

export const legalContent: Record<string, LegalContent> = {
    [View.IMPRINT]: {
        title: {
            de: 'Impressum',
            es: 'Impressum',
            en: 'Imprint'
        },
        content: {
            de: `
### Angaben gemäß § 5 TMG
- **Firma:** Alba Garate
- **Rechtsform:** Einzelunternehmen
- **Vertretungsberechtigte:** Alba Garate
- **Adresse:** Marienburgerstr. 38, 10405 Berlin, Germany
- **Kontakt:**  
  - E-Mail: orakos@gmail.com 
  - Telefon: +49 15124918577
- **USt-IdNr.:** [DE 123456789]  
- **Handelsregister:** [HRB 12345 – Amtsgericht XYZ]
`,
            es: `
### Aviso Legal
- **Compañía:** Alba Garate
- **Forma Legal:** Einzelunternehmen
- **Responsable:** Alba Garate
- **Dirección:** Marienburgerstr. 38, 10405 Berlin, Germany
- **Contacto:**  
  - E-Mail: orakos@gmail.com 
  - Teléfono: +49 15124918577
- **USt-IdNr.:** [DE 123456789]  
- **Handelsregister:** [HRB 12345 – Amtsgericht XYZ]
`,
            en: `
### Imprint
- **Company:** Alba Garate
- **Legal Form:** Einzelunternehmen
- **Responsible:** Alba Garate
- **Address:** Marienburgerstr. 38, 10405 Berlin, Germany
- **Contact:**  
  - E-Mail: orakos@gmail.com 
  - Telephone: +49 15124918577
- **USt-IdNr.:** [DE 123456789]  
- **Handelsregister:** [HRB 12345 – Amtsgericht XYZ]
`
        }
    },
    [View.PRIVACY]: {
        title: {
            de: 'Datenschutzerklärung',
            es: 'Declaración de Protección de Datos',
            en: 'Privacy Policy'
        },
        content: {
            de: `
## 1. Verantwortliche Stelle  
**Firma:** [Orakos Digital GmbH]  
**Vertretungsberechtigte:** [Alba Garate]  
**Anschrift:** [Musterstraße 1, 12345 München, Deutschland]  
**E-Mail:** privacy@orakos.com  
**Telefon:** [+49 123 456789]  
## 2. Verarbeitete Daten  
- **Nutzungsdaten**: IP-Adresse, Browser-Typ, Zeitstempel  
- **Bestelldaten**: Name, E-Mail, Geburtsdatum, Zahlungs­informationen  
## 3. Zweck & Rechtsgrundlage  
- **Art. 6 (1)(b) DSGVO** – Vertragserfüllung  
- **Art. 6 (1)(f) DSGVO** – Berechtigte Interessen (Sicherheit, Analyse)  
- **Art. 6 (1)(a) DSGVO** – Einwilligung (Marketing-Cookies)  
## 4. Drittlands­übermittlung  
Übermittlungen in die USA (Stripe) beruhen auf **EU-Standardvertragsklauseln** mit ergänzenden technischen Schutzmaßnahmen.
## 5. Speicherdauer  
Personenbezogene Daten werden spätestens **drei (3) Jahre** nach Ende der Vertrags­beziehung gelöscht, sofern keine handels- oder steuerrechtlichen Aufbewahrungs­fristen (bis zu **zehn (10) Jahre**) entgegenstehen.
## 6. Rechte der betroffenen Personen  
Auskunft – Berichtigung – Löschung – Einschränkung – Daten­übertragbarkeit – **Widerspruchsrecht** – **Widerruf einer Einwilligung** – Beschwerde bei der Aufsichts­behörde.
## 7. Drittanbieter  
- **Zahlungsdienst:** Stripe, USA (EU-US DPR, SCCs)  
- **Hosting:** Vercel, EU  
## 8. Cookies  
Details siehe **[Cookie-Einstellungen](/cookies)**.
## 9. Aufsichtsbehörde  
Bayerisches Landesamt für Datenschutzaufsicht (BayLDA) – <https://www.lda.bayern.de>
`,
            es: `
## 1. Responsable  
**Entidad:** [Orakos Digital GmbH]  
**Representante:** [Alba Garate]  
**Dirección:** [Calle Ejemplo 1, 12345 Múnich, Alemania]  
**Correo:** privacy@orakos.com  
**Teléfono:** [+49 123 456789]  
## 2. Datos tratados  
- **Datos de uso:** IP, navegador, marca temporal  
- **Datos de pedido:** nombre, correo, fecha de nacimiento, datos de pago  
## 3. Finalidad y base jurídica  
- **Art. 6 (1)(b) RGPD** – ejecución del contrato  
- **Art. 6 (1)(f) RGPD** – intereses legítimos (seguridad, analítica)  
- **Art. 6 (1)(a) RGPD** – consentimiento (cookies de marketing)  
## 4. Transferencias internacionales  
Las transferencias a EE. UU. (Stripe) se basan en las **Cláusulas Contractuales Tipo de la UE** y salvaguardas técnicas adicionales.
## 5. Plazo de conservación  
Los datos se suprimirán **a los 3 años** tras la última interacción, salvo obligaciones mercantiles y fiscales (hasta **10 años**).
## 6. Derechos de los interesados  
Acceso – Rectificación – Supresión – Limitación – Portabilidad – **Derecho de oposición** – **Retirada del consentimiento** – Reclamación ante la autoridad de control.
## 7. Proveedores externos  
- **Pasarela de pago:** Stripe, EE. UU. (EU-US DPR, SCCs)  
- **Alojamiento:** Vercel, UE  
## 8. Cookies  
Consulta la página **[Configuración de cookies](/cookies)**.
## 9. Autoridad de control  
Bayerisches Landesamt für Datenschutzaufsicht (BayLDA) – <https://www.lda.bayern.de>
`,
            en: `
## 1. Controller  
**Company:** [Orakos Digital GmbH]  
**Representative:** [Alba Garate]  
**Address:** [Sample Street 1, 12345 Munich, Germany]  
**Email:** privacy@orakos.com  
**Phone:** +49 123 456789  
## 2. Data We Process  
- **Usage data:** IP address, browser type, timestamp  
- **Order data:** name, email, date of birth, payment info  
## 3. Purpose & Legal Basis  
- **Art. 6 (1)(b) GDPR** – contract performance  
- **Art. 6 (1)(f) GDPR** – legitimate interests (security, analytics)  
- **Art. 6 (1)(a) GDPR** – consent (marketing cookies)  
## 4. International Transfers  
Data sent to the USA (Stripe) relies on **EU Standard Contractual Clauses** and supplementary technical safeguards.
## 5. Storage Period  
Personal data are erased **within 3 years** after the last user interaction unless commercial/tax laws require retention for up to **10 years**.
## 6. Data Subject Rights  
Access – Rectification – Erasure – Restriction – Portability – **Right to object** – **Withdrawal of consent** – Complaint to the supervisory authority.
## 7. Third-Party Providers  
- **Payment service:** Stripe, USA (EU-US DPR, SCCs)  
- **Hosting:** Vercel, EU  
## 8. Cookies  
See our **[Cookie Settings](/cookies)** page for details.
## 9. Supervisory Authority  
Bavarian Data Protection Authority (BayLDA) – <https://www.lda.bayern.de>
`
        }
    },
    [View.COOKIES]: {
        title: { de: 'Cookie-Einstellungen', es: 'Configuración de Cookies', en: 'Cookie Settings' },
        content: { de: '### Inhalt für Cookie-Einstellungen steht noch aus.', es: '### Contenido de Configuración de Cookies pendiente.', en: '### Cookie Settings content pending.' }
    },
    [View.TERMS]: {
        title: { de: 'AGB', es: 'Términos y Condiciones', en: 'Terms & Conditions' },
        content: { de: '### Inhalt für AGB steht noch aus.', es: '### Contenido de Términos y Condiciones pendiente.', en: '### Terms & Conditions content pending.' }
    },
    [View.WITHDRAWAL]: {
        title: { de: 'Widerrufsbelehrung', es: 'Derecho de Desistimiento', en: 'Right of Withdrawal' },
        content: { de: '### Inhalt für Widerrufsbelehrung steht noch aus.', es: '### Contenido de Derecho de Desistimiento pendiente.', en: '### Right of Withdrawal content pending.' }
    },
    [View.DISPUTE]: {
        title: { de: 'Hinweis Verbraucherstreitbeilegung', es: 'Resolución de Litigios en materia de Consumo', en: 'Consumer Dispute Resolution' },
        content: { de: '### Inhalt für Hinweis Verbraucherstreitbeilegung steht noch aus.', es: '### Contenido de Resolución de Litigios pendiente.', en: '### Consumer Dispute Resolution content pending.' }
    },
    [View.FAQ]: {
        title: { de: 'Häufig gestellte Fragen', es: 'Preguntas frecuentes', en: 'Frequently Asked Questions' },
        content: { de: '### Inhalt für FAQ steht noch aus.', es: '### Contenido de Preguntas frecuentes pendiente.', en: '### FAQ content pending.' }
    },
    [View.CONTACT]: {
        title: { de: 'Kontakt', es: 'Contacto', en: 'Contact' },
        content: { de: '### Inhalt für Kontakt steht noch aus.', es: '### Contenido de Contacto pendiente.', en: '### Contact content pending.' }
    }
};