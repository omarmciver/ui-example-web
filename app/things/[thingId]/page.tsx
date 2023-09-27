"use client";
import React from "react";

interface ThingDynamicRouteElement {
  params: ThingParams;
}
interface ThingParams {
  thingId: string;
}

export default function ViewThingPage({
  params,
}: ThingDynamicRouteElement) {
  return (
    <>
      Hurray! {params.thingId}
    </>
  );
}
