import Image from "next/image";

const NMLS_CONSUMER_ACCESS_URL = "https://www.nmlsconsumeraccess.org";
export default function ComplianceFooter() {
  return (
    <footer className="mt-auto border-t border-[#0c1b4a] bg-[#020a39] text-white">
      <div className="mx-auto max-w-6xl px-6 py-6 text-xs leading-5 md:px-8">
        <div className="mb-5 flex flex-wrap items-center gap-6">
          <Image
            src="/brand/c2financial-logo.png"
            alt="C2 Financial Corporation"
            width={160}
            height={36}
            className="h-auto w-auto"
          />
          <Image
            src="/brand/footer-img-1.jpg"
            alt="Equal Housing Opportunity"
            width={98}
            height={106}
            className="h-auto w-auto"
          />
          <a href={NMLS_CONSUMER_ACCESS_URL} target="_blank" rel="noopener noreferrer">
            <Image
              src="/brand/footer-img-2.png"
              alt="NMLS Consumer Access"
              width={95}
              height={106}
              className="h-auto w-auto"
            />
          </a>
        </div>
        <p className="font-semibold">
          C2 Financial Corporation | Company NMLS #135622 | Louisiana OFI #135622 | Mississippi DBCF #135622
        </p>
        <p className="mt-1 font-semibold">John Ismail | RMLO | NMLS #231283</p>
        <p className="mt-2">
          C2 Financial is rapidly growing with active licenses in over 34 states as of March 2024.
          Number of licensed states and lenders within the C2 Lender Network may vary.
          www.C2Financial.com
        </p>
        <p className="mt-3">
          This licensee is performing acts for which a mortgage Company License is required.
          C2 Financial Corporation is licensed by the Texas Department of Savings and Mortgage
          Lending; NMLS #135622. Loan approval is not guaranteed and is subject to lender review
          of information. All loan approvals are conditional and all conditions must be met by
          borrower. Loan is only approved when lender has issued approval in writing and is
          subject to lender conditions. Specified rates may not be available for all borrowers.
          Rate subject to change with market conditions. C2 Financial Corporation is an Equal
          Opportunity Mortgage Broker/Lender.
        </p>
        <p className="mt-2">
          The services referred to herein are not available to persons located outside the state
          of Louisiana and Mississippi.
        </p>
        <p className="mt-2">
          As a broker, C2 Financial Corporation has the ability to broker VA loans based on
          relationships with VA approved lenders. C2 Financial Corporation is not acting on behalf
          of or at the direction of HUD/FHA or the VA.
        </p>
        <p className="mt-2">
          Consumers wishing to file a complaint against a company or a residential mortgage loan
          originator may submit a written complaint to the Louisiana Office of Financial
          Institutions (OFI). Complaint forms and instructions are available at
          {" "}
          <a
            className="font-semibold underline"
            href="https://ofi.la.gov/complaints/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ofi.la.gov/complaints/
          </a>
          .
        </p>
        <p className="mt-2">
          Consumers wishing to file a complaint against a company or a residential mortgage loan
          originator may submit a complaint to the Mississippi Department of Banking and Consumer
          Finance (DBCF). Complaint forms and instructions are available at
          {" "}
          <a
            className="font-semibold underline"
            href="https://dbcf.ms.gov/complaint-form/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://dbcf.ms.gov/complaint-form/
          </a>
          .
        </p>
        <p className="mt-3">
          <a
            className="font-semibold underline"
            href={NMLS_CONSUMER_ACCESS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            NMLS Consumer Access
          </a>
        </p>
        <p className="mt-3 font-semibold">
          Corporate Address: 12230 El Camino Real, Ste 100 | San Diego, CA 92130
        </p>
      </div>
    </footer>
  );
}
