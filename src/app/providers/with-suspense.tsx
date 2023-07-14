import { ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { LoadingBadgeForGlobalSuspense } from "shared/ui/LoadingBadgeForGloabalSuspense";

export const withSuspense = (component: () => ReactNode) => () => {
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsFirstLoading(false);
  });

  return isFirstLoading ? (
    <Suspense fallback={<LoadingBadgeForGlobalSuspense text={"IAmPaul"} />}>
      {component()}
    </Suspense>
  ) : (
    <>{component()}</>
  );
};
