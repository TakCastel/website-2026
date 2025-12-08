import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import { LEGAL_INFO, PERSONAL_INFO } from '../../constants';

interface LegalProps {
  lang: Language;
}

const LegalNotice: React.FC<LegalProps> = ({ lang }) => {
  return (
    <div className="pt-32 px-6 md:px-12 pb-20 max-w-4xl mx-auto text-ink dark:text-off-white min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl md:text-5xl font-bold uppercase mb-12"
      >
        {lang === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
      </motion.h1>

      <div className="space-y-12 leading-relaxed opacity-80 text-sm md:text-base">
        
        <p className="italic opacity-60">
            {lang === 'fr' 
            ? "Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs du site les présentes mentions légales."
            : "In accordance with the provisions of Articles 6-III and 19 of Law n°2004-575 of June 21, 2004 for Confidence in the Digital Economy, known as L.C.E.N., users and visitors of the site are informed of these legal notices."}
        </p>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '1. Éditeur du site' : '1. Website Editor'}</h2>
          <p>
            {lang === 'fr' ? "Le site est édité par :" : "The website is edited by:"}
            <br />
            <strong>{LEGAL_INFO.companyName}</strong>
            <br />
            {lang === 'fr' ? "Responsable de publication :" : "Publication Director:"} {PERSONAL_INFO.name}
            <br />
            {lang === 'fr' ? "Adresse du siège :" : "Headquarters Address:"} {LEGAL_INFO.address}
            <br />
            SIRET : {LEGAL_INFO.siret}
            <br />
            {lang === 'fr' ? "TVA Intracommunautaire :" : "VAT Number:"} {LEGAL_INFO.vatNumber}
            <br />
            Email : {PERSONAL_INFO.email}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '2. Hébergement' : '2. Hosting'}</h2>
          <p>
            {lang === 'fr' ? "Le site est hébergé sur l'infrastructure Cloud de Google :" : "The website is hosted on Google Cloud infrastructure:"}
            <br />
            <strong>{LEGAL_INFO.hostName}</strong>
            <br />
            {LEGAL_INFO.hostAddress}
            <br />
            {lang === 'fr' 
                ? "L'infrastructure technique est gérée via le service Google Cloud Run, garantissant sécurité et haute disponibilité."
                : "Technical infrastructure is managed via Google Cloud Run service, ensuring security and high availability."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '3. Propriété Intellectuelle' : '3. Intellectual Property'}</h2>
          <p>
            {lang === 'fr' 
              ? "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication."
              : "All content on this website requires permission to be reproduced or used, as per French and international intellectual property laws. Reproduction of all or part of this site on any electronic medium whatsoever is strictly prohibited without express authorization from the publication director."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '4. Médiation' : '4. Mediation'}</h2>
          <p>
             {lang === 'fr'
               ? `Conformément aux articles L.616-1 et R.616-1 du code de la consommation, nous proposons un dispositif de médiation de la consommation. L'entité de médiation retenue est : ${LEGAL_INFO.mediator}. En cas de litige, vous pouvez déposer votre réclamation sur son site internet ou par voie postale.`
               : "In accordance with consumer laws, we offer a mediation service for dispute resolution. In case of dispute, you can file your claim on the mediator's website."
             }
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '5. Limitation de responsabilité' : '5. Limitation of Liability'}</h2>
          <p>
             {lang === 'fr'
               ? "Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email. Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité."
               : "Information on this site is as accurate as possible but may contain inaccuracies or omissions. Any downloaded content is at the user's own risk and sole responsibility."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '6. Liens Hypertextes' : '6. Hyperlinks'}</h2>
          <p>
             {lang === 'fr'
               ? "Le site internet peut offrir des liens vers d’autres sites internet ou d’autres ressources disponibles sur Internet. Tarik Talhaoui ne dispose d'aucun moyen pour contrôler les sites en connexion avec ses sites internet et ne répond pas de la disponibilité de tels sites et sources externes, ni ne la garantit."
               : "The website may provide links to other websites. Tarik Talhaoui has no control over these sites and is not responsible for their availability or content."}
          </p>
        </section>

      </div>
    </div>
  );
};

export default LegalNotice;