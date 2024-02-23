import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type CarouselApi } from "@/components/ui/carousel";

import { AdModel } from "@/types/adTypes";
import { Card, CardContent, CardTitle } from "./ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { FaBath, FaBed, FaHeart, FaRegHeart, FaShare } from "react-icons/fa6";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";

export type GhostAd = {};

export function GhostAd(props: GhostAd) {
  const {} = props;

  return (
    <Card className="overflow-hidden shadow relative border border-black/30 animate-pulse">
      <div className="text-xs absolute top-2 right-2 bg-black/20 text-white rounded p-1 z-50">
        <div className="w-10 rounded h-4" />
      </div>
      <CardTitle className="relative">
        <div className="rounded h-36 w-full bg-gray-200" />
      </CardTitle>
      <CardContent className="p-2 relative space-y-4">
        <div className="ghost space-y-1">
          <div className="w-32 rounded h-4 bg-gray-200" />
          <div className="w-44 rounded h-4 bg-gray-200" />
        </div>
        <div className="ghost space-y-1">
          <div className="w-32 rounded h-4 bg-gray-200" />
          <div className="w-44 rounded h-4 bg-gray-200" />
        </div>
        <div className="w-16 rounded h-4 bg-gray-200" />
      </CardContent>
    </Card>
  );
}
