import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import { PERSONAL_INFO } from '../../constants';

interface PrivacyProps {
  lang: Language;
}

const PrivacyPolicy: React.FC<PrivacyProps> = ({ lang }) => {
  return (
    <div className="pt-32 px-6 md:px-12 pb-20 max-w-4xl mx-auto text-ink dark:text-off-white min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl md:text-5xl font-bold uppercase mb-12"
      >
        {lang === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
      </motion.h1>

      <div className="space-y-12 leading-relaxed opacity-80 text-sm md:text-base">
        
        <p className="italic opacity-60">
             {lang === 'fr' 
             ? "Tarik Talhaoui s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site tariktalhaoui.fr, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés."
             : "Tarik Talhaoui is committed to ensuring that the collection and processing of your data, carried out from tariktalhaoui.fr, complies with the General Data Protection Regulation (GDPR)."}
        </p>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '1. Données collectées' : '1. Data Collection'}</h2>
          <p>
            {lang === 'fr' 
              ? "Nous collectons les données suivantes uniquement lorsque vous utilisez le formulaire de contact :"
              : "We collect the following data only when you use the contact form:"}
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
             <li>{lang === 'fr' ? "Nom et Prénom" : "Full Name"}</li>
             <li>{lang === 'fr' ? "Adresse Email" : "Email Address"}</li>
             <li>{lang === 'fr' ? "Informations relatives à votre projet (Message)" : "Project Information (Message)"}</li>
             <li>{lang === 'fr' ? "Données techniques (Adresse IP, navigateur) collectées automatiquement par les logs serveur Google Cloud à des fins de sécurité." : "Technical data (IP, browser) collected automatically by Google Cloud server logs for security."}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '2. Finalité des données' : '2. Purpose of Data'}</h2>
          <p>
            {lang === 'fr' 
              ? "Les données personnelles recueillies sur le site ont pour principal objectif de :"
              : "The main purpose of the personal data collected is to:"}
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
             <li>{lang === 'fr' ? "Répondre à vos demandes de devis et de contact." : "Respond to your quote and contact requests."}</li>
             <li>{lang === 'fr' ? "Constituer un fichier client pour le suivi commercial (base légale : exécution de mesures précontractuelles)." : "Create a client file for commercial follow-up."}</li>
             <li>{lang === 'fr' ? "Améliorer la sécurité du site via l'analyse des logs." : "Improve site security via log analysis."}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '3. Hébergement et Sécurité' : '3. Hosting & Security'}</h2>
          <p>
            {lang === 'fr' 
              ? "Vos données sont hébergées sur l'infrastructure de Google Cloud Platform (région Europe de l'Ouest si possible), qui présente des garanties de sécurité conformes aux standards de l'industrie (ISO 27001)."
              : "Your data is hosted on Google Cloud Platform infrastructure (Western Europe region where possible), ensuring industry-standard security (ISO 27001)."}
            <br/><br/>
            {lang === 'fr' 
              ? "Toutes les communications entre votre navigateur et notre site sont chiffrées via le protocole HTTPS (TLS 1.2 / 1.3)."
              : "All communications between your browser and our site are encrypted via HTTPS (TLS 1.2 / 1.3)."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '4. Destinataires' : '4. Recipients'}</h2>
          <p>
            {lang === 'fr' 
              ? "Les données sont destinées exclusivement à Tarik Talhaoui. Elles ne sont ni vendues, ni louées, ni cédées à des tiers à des fins commerciales."
              : "The data is intended exclusively for Tarik Talhaoui. It is neither sold, rented, nor transferred to third parties for commercial purposes."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '5. Durée de conservation' : '5. Retention Period'}</h2>
          <p>
            {lang === 'fr' 
              ? "Vos données sont conservées pendant la durée nécessaire au traitement de votre demande. Pour les prospects n'ayant pas conclu de contrat, les données sont conservées 3 ans maximum à compter du dernier contact."
              : "Your data is kept for the time necessary to process your request. For prospects, data is kept for a maximum of 3 years from the last contact."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '6. Vos droits' : '6. Your Rights'}</h2>
          <p>
             {lang === 'fr'
               ? "Vous pouvez exercer votre droit d'accès, de rectification, d'effacement, d'opposition et de portabilité concernant vos données en contactant :"
               : "You can exercise your right to access, rectify, delete, oppose, and transport your data by contacting:"}
             <br /><br />
             <strong>{PERSONAL_INFO.email}</strong>
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;