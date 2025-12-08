import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';

interface TermsProps {
  lang: Language;
}

const TermsOfSales: React.FC<TermsProps> = ({ lang }) => {
  return (
    <div className="pt-32 px-6 md:px-12 pb-20 max-w-4xl mx-auto text-ink dark:text-off-white min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl md:text-5xl font-bold uppercase mb-12"
      >
        {lang === 'fr' ? 'Conditions Générales de Vente' : 'Terms of Sales'}
      </motion.h1>

      <div className="space-y-12 leading-relaxed opacity-80 text-sm md:text-base">
        
        <div className="bg-accent/10 p-4 border border-accent/20 rounded-lg mb-8 text-sm">
             {lang === 'fr' 
                ? "Préambule : Ces conditions s'appliquent de plein droit à toutes les prestations de services conclues avec Tarik Talhaoui. La signature d'un devis entraîne l'acceptation sans réserve des présentes CGV."
                : "Preamble: These terms apply to all services concluded with Tarik Talhaoui. Signing a quote implies unreserved acceptance of these Terms."}
        </div>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '1. Objet' : '1. Object'}</h2>
          <p>
            {lang === 'fr' 
              ? "Les présentes conditions visent à définir les relations contractuelles entre Tarik Talhaoui (le Prestataire) et le Client, ainsi que les conditions applicables à tout achat de prestations de services (développement web, conseil, design)."
              : "These conditions define the contractual relationship between Tarik Talhaoui (the Provider) and the Client for any purchase of services."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '2. Tarifs et Paiement' : '2. Rates and Payment'}</h2>
          <p>
            {lang === 'fr' 
              ? "Les prix sont indiqués en euros et hors taxes (TVA non applicable, art. 293 B du CGI). Un acompte de 30% est exigé à la signature du devis pour démarrer la mission. Le solde est payable à la livraison ou selon l'échéancier défini au devis."
              : "Prices are in Euros excluding tax. A 30% deposit is required upon signing the quote. Balance is due upon delivery."}
            <br/><br/>
            {lang === 'fr' 
              ? "Retard de paiement : En cas de défaut de paiement total ou partiel des prestations livrées au jour de la réception, l'acheteur doit verser au prestataire une pénalité de retard égale à trois fois le taux de l'intérêt légal. Une indemnité forfaitaire de 40€ est également due pour frais de recouvrement." 
              : "Late payment penalties equal to three times the legal interest rate apply. A fixed compensation of 40€ for recovery costs is also due."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '3. Propriété Intellectuelle' : '3. Intellectual Property'}</h2>
          <p>
            {lang === 'fr' 
              ? "Le transfert de propriété intellectuelle des réalisations ne devient effectif qu'après paiement intégral du prix. Jusqu'à ce paiement, Tarik Talhaoui reste propriétaire des droits d'exploitation des créations. Une fois le paiement effectué, le client devient propriétaire du code source et des designs finaux pour l'usage défini au contrat."
              : "Intellectual property transfer is only effective after full payment. Until then, Tarik Talhaoui remains the owner. Upon payment, the client owns the source code and designs."}
          </p>
        </section>

        <section>
           <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '4. Droit de rétractation' : '4. Withdrawal Right'}</h2>
           <p>
             {lang === 'fr'
               ? "Conformément à l’article L121-21-8 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de services pleinement exécutés avant la fin du délai de rétractation et dont l'exécution a commencé après accord préalable exprès du consommateur, ni pour la fourniture de biens confectionnés selon les spécifications du consommateur ou nettement personnalisés (Site Web sur-mesure)."
               : "The right of withdrawal cannot be exercised for services fully performed or for custom-made goods (Custom Websites), in accordance with consumer law."}
           </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '5. Responsabilité & Force Majeure' : '5. Liability & Force Majeure'}</h2>
          <p>
             {lang === 'fr'
               ? "La responsabilité du Prestataire ne pourra être engagée qu'en cas de faute prouvée et est limitée au montant de la prestation. Le Prestataire ne saurait être tenu responsable des dommages résultant d'un cas de force majeure (panne réseau généralisée, incendie, grève...)."
               : "The Provider's liability requires proven fault and is limited to the service amount. Force majeure events exempt the Provider from liability."}
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold uppercase mb-4 text-accent">{lang === 'fr' ? '6. Droit applicable' : '6. Applicable Law'}</h2>
          <p>
             {lang === 'fr'
               ? "Tout litige relatif à l'interprétation et à l'exécution des présentes conditions générales de vente est soumis au droit français. À défaut de résolution amiable, le litige sera porté devant le Tribunal de Commerce d'Avignon."
               : "Disputes are subject to French law and the Commercial Court of Avignon."}
          </p>
        </section>

      </div>
    </div>
  );
};

export default TermsOfSales;