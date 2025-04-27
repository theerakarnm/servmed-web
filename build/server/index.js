var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, useLoaderData, Meta, Links, ScrollRestoration, Scripts, Link } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { useState, useRef, useEffect, Suspense } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check, ChevronUp, Upload, FileText, X, CheckCircle, Expand, ChevronLeft, ChevronRight, Circle, Award, AlertCircle, ShoppingCart, Heart, Info, MessageSquare, ThumbsUp, ThumbsDown, Star, Filter, Menu, Search, User, ArrowRight, ShoppingBag, TrendingUp } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { toast } from "sonner";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { formatDistanceToNow } from "date-fns";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import axios, { HttpStatusCode } from "axios";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `window.ENV = ${JSON.stringify({
              env: data == null ? void 0 : data.ENV
            })}`
          }
        }
      ),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
async function loader$2() {
  return Response.json({
    ENV: {
      PUBLIC_API_URL: process.env.PUBLIC_API_URL
    }
  });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function FormSection({ title, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-medium text-lg mb-4", children: title }),
    children
  ] });
}
function BusinessInfoForm({ formData, updateFormData, nextStep }) {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-center", children: "ข้อมูลธุรกิจ" }),
    /* @__PURE__ */ jsx(FormSection, { title: "ข้อมูลสถานประกอบการ", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "businessName", children: [
          "ชื่อ-นามสกุล ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "businessName",
            value: formData.businessName,
            onChange: (e) => updateFormData({ businessName: e.target.value }),
            placeholder: "ชื่อ-นามสกุล",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "businessType", children: [
          "ชื่อสถานประกอบการ ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "businessType",
            value: formData.businessType,
            onChange: (e) => updateFormData({ businessType: e.target.value }),
            placeholder: "ชื่อสถานประกอบการ",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "businessCategory", children: [
          "ลักษณะสถานประกอบการ ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: formData.businessCategory,
            onValueChange: (value) => updateFormData({ businessCategory: value }),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { id: "businessCategory", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "เลือกลักษณะสถานประกอบการ" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "pharmacy", children: "ร้านขายยา" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "clinic", children: "คลินิก" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "hospital", children: "โรงพยาบาล" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "other", children: "อื่นๆ" })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(FormSection, { title: "ข้อมูลเพิ่มเติม", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "taxId", children: "เลขประจำตัวผู้เสียภาษี" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "taxId",
            value: formData.taxId,
            onChange: (e) => updateFormData({ taxId: e.target.value }),
            placeholder: "เลขประจำตัวผู้เสียภาษี"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "profession", children: "วิชาชีพ" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "profession",
            value: formData.profession,
            onChange: (e) => updateFormData({ profession: e.target.value }),
            placeholder: "วิชาชีพ"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "licenseNumber", children: "เลขที่ใบประกอบโรคศิลปะ" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "licenseNumber",
            value: formData.licenseNumber,
            onChange: (e) => updateFormData({ licenseNumber: e.target.value }),
            placeholder: "เลขที่ใบประกอบโรคศิลปะ"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsx(Button, { type: "button", onClick: handleNext, children: "ถัดไป" }) })
  ] });
}
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
function AddressForm({ formData, updateFormData, nextStep, prevStep }) {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };
  const handleUseMainAddress = (checked) => {
    updateFormData({ useMainAddress: checked });
    if (checked) {
      updateFormData({
        mailingAddress: formData.address,
        mailingProvince: formData.province,
        mailingDistrict: formData.district,
        mailingSubdistrict: formData.subdistrict,
        mailingPostalCode: formData.postalCode
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-center", children: "ข้อมูลที่อยู่" }),
    /* @__PURE__ */ jsx(FormSection, { title: "ที่อยู่", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "address", children: [
          "ที่อยู่ ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "address",
            value: formData.address,
            onChange: (e) => updateFormData({ address: e.target.value }),
            placeholder: "บ้านเลขที่/หมู่/ถนน",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "province", children: [
            "จังหวัด ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(Select, { value: formData.province, onValueChange: (value) => updateFormData({ province: value }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { id: "province", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "เลือกจังหวัด" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "bangkok", children: "กรุงเทพมหานคร" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "nonthaburi", children: "นนทบุรี" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "pathumthani", children: "ปทุมธานี" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "district", children: [
            "อำเภอ ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(Select, { value: formData.district, onValueChange: (value) => updateFormData({ district: value }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { id: "district", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "เลือกอำเภอ" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "district1", children: "อำเภอ 1" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "district2", children: "อำเภอ 2" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "district3", children: "อำเภอ 3" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "subdistrict", children: [
            "ตำบล ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(Select, { value: formData.subdistrict, onValueChange: (value) => updateFormData({ subdistrict: value }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { id: "subdistrict", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "เลือกตำบล" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "subdistrict1", children: "ตำบล 1" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "subdistrict2", children: "ตำบล 2" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "subdistrict3", children: "ตำบล 3" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "postalCode", children: [
            "รหัสไปรษณีย์ ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "postalCode",
              value: formData.postalCode,
              onChange: (e) => updateFormData({ postalCode: e.target.value }),
              placeholder: "รหัสไปรษณีย์",
              required: true
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(FormSection, { title: "ที่อยู่จัดส่ง", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Checkbox, { id: "useMainAddress", checked: formData.useMainAddress, onCheckedChange: handleUseMainAddress }),
        /* @__PURE__ */ jsx(Label, { htmlFor: "useMainAddress", children: "ใช้ที่อยู่เดียวกัน" })
      ] }),
      !formData.useMainAddress && /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "mailingAddress", children: [
            "ที่อยู่จัดส่ง ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "mailingAddress",
              value: formData.mailingAddress,
              onChange: (e) => updateFormData({ mailingAddress: e.target.value }),
              placeholder: "บ้านเลขที่/หมู่/ถนน",
              required: !formData.useMainAddress
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "mailingProvince", children: [
              "จังหวัด ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: formData.mailingProvince,
                onValueChange: (value) => updateFormData({ mailingProvince: value }),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { id: "mailingProvince", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "เลือกจังหวัด" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "bangkok", children: "กรุงเทพมหานคร" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "nonthaburi", children: "นนทบุรี" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "pathumthani", children: "ปทุมธานี" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "mailingDistrict", children: [
              "อำเภอ ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: formData.mailingDistrict,
                onValueChange: (value) => updateFormData({ mailingDistrict: value }),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { id: "mailingDistrict", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "เลือกอำเภอ" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "district1", children: "อำเภอ 1" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "district2", children: "อำเภอ 2" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "district3", children: "อำเภอ 3" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "mailingSubdistrict", children: [
              "ตำบล ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: formData.mailingSubdistrict,
                onValueChange: (value) => updateFormData({ mailingSubdistrict: value }),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { id: "mailingSubdistrict", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "เลือกตำบล" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "subdistrict1", children: "ตำบล 1" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "subdistrict2", children: "ตำบล 2" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "subdistrict3", children: "ตำบล 3" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "mailingPostalCode", children: [
              "รหัสไปรษณีย์ ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "mailingPostalCode",
                value: formData.mailingPostalCode,
                onChange: (e) => updateFormData({ mailingPostalCode: e.target.value }),
                placeholder: "รหัสไปรษณีย์",
                required: !formData.useMainAddress
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-4", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: prevStep, children: "ย้อนกลับ" }),
      /* @__PURE__ */ jsx(Button, { type: "button", onClick: handleNext, children: "ถัดไป" })
    ] })
  ] });
}
function ContactForm({ formData, updateFormData, nextStep, prevStep }) {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-center", children: "ข้อมูลติดต่อ" }),
    /* @__PURE__ */ jsx(FormSection, { title: "ข้อมูลการติดต่อ", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "phone", children: [
          "โทร ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "phone",
            type: "tel",
            value: formData.phone,
            onChange: (e) => updateFormData({ phone: e.target.value }),
            placeholder: "เบอร์โทรศัพท์",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "email", children: [
          "อีเมล ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "email",
            type: "email",
            value: formData.email,
            onChange: (e) => updateFormData({ email: e.target.value }),
            placeholder: "อีเมล",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "lineId", children: "ไลน์ไอดี" }),
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500", children: "@" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "lineId",
              value: formData.lineId,
              onChange: (e) => updateFormData({ lineId: e.target.value }),
              placeholder: "ไลน์ไอดี",
              className: "rounded-l-none"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "referralSource", children: [
          "ท่านรู้จักมาจากไหน ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: formData.referralSource,
            onValueChange: (value) => updateFormData({ referralSource: value }),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { id: "referralSource", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "เลือกช่องทางที่รู้จัก" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "facebook", children: "Facebook" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "line", children: "Line" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "website", children: "Website" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "friend", children: "เพื่อนแนะนำ" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "other", children: "อื่นๆ" })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-4", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: prevStep, children: "ย้อนกลับ" }),
      /* @__PURE__ */ jsx(Button, { type: "button", onClick: handleNext, children: "ถัดไป" })
    ] })
  ] });
}
function FileUpload({ id, accept, value, onChange, required }) {
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);
  const handleFileChange = (e) => {
    var _a;
    const file = ((_a = e.target.files) == null ? void 0 : _a[0]) || null;
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };
  const handleClear = () => {
    setFileName("");
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "file",
        id,
        ref: inputRef,
        accept,
        onChange: handleFileChange,
        className: "hidden",
        required
      }
    ),
    !fileName ? /* @__PURE__ */ jsx(
      "div",
      {
        className: "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors",
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsx(Upload, { className: "h-6 w-6 text-gray-400" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "คลิกเพื่ออัพโหลดไฟล์" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "รองรับไฟล์ JPG, PNG และ PDF" })
        ] })
      }
    ) : /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border rounded-lg p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 text-blue-500" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium truncate max-w-[200px]", children: fileName })
      ] }),
      /* @__PURE__ */ jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: handleClear, className: "h-8 w-8 p-0", children: [
        /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "ลบไฟล์" })
      ] })
    ] })
  ] });
}
function DocumentsForm({ formData, updateFormData, prevStep, onSubmit }) {
  const handleFileChange = (field, file) => {
    updateFormData({ [field]: file });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-center", children: "เอกสาร" }),
    /* @__PURE__ */ jsx(FormSection, { title: "แนบไฟล์", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "idCard", children: [
          "บัตรประชาชน ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          FileUpload,
          {
            id: "idCard",
            accept: ".jpg,.jpeg,.png,.pdf",
            value: formData.idCard,
            onChange: (file) => handleFileChange("idCard", file),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "businessLicense", children: [
          "ใบอนุญาตสถานประกอบการ ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          FileUpload,
          {
            id: "businessLicense",
            accept: ".jpg,.jpeg,.png,.pdf",
            value: formData.businessLicense,
            onChange: (file) => handleFileChange("businessLicense", file),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "professionalLicense", children: [
          "ใบประกอบโรคศิลปะ ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          FileUpload,
          {
            id: "professionalLicense",
            accept: ".jpg,.jpeg,.png,.pdf",
            value: formData.professionalLicense,
            onChange: (file) => handleFileChange("professionalLicense", file),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2 pt-4", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            id: "acceptTerms",
            checked: formData.acceptTerms,
            onCheckedChange: (checked) => updateFormData({ acceptTerms: checked === true }),
            required: true
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid gap-1.5 leading-none", children: /* @__PURE__ */ jsxs(Label, { htmlFor: "acceptTerms", className: "text-sm font-normal", children: [
          "ยอมรับ",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/terms", className: "text-primary underline", children: "เงื่อนไขและข้อตกลง" })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-4", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: prevStep, children: "ย้อนกลับ" }),
      /* @__PURE__ */ jsx(Button, { type: "submit", onClick: onSubmit, disabled: !formData.acceptTerms, children: "ยืนยัน" })
    ] })
  ] });
}
function RegistrationComplete() {
  return /* @__PURE__ */ jsxs("div", { className: "py-8 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-16 w-16 text-green-500" }) }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-2", children: "ลงทะเบียนสำเร็จ" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "ขอบคุณสำหรับการลงทะเบียน เราจะตรวจสอบข้อมูลของท่านและติดต่อกลับโดยเร็วที่สุด" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "กลับสู่หน้าหลัก" }) })
  ] });
}
function FormProgress({ currentStep, totalSteps }) {
  const steps = [
    { id: 1, name: "ข้อมูลธุรกิจ" },
    { id: 2, name: "ที่อยู่" },
    { id: 3, name: "ข้อมูลติดต่อ" },
    { id: 4, name: "เอกสาร" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden sm:block", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: steps.map((step) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `flex items-center justify-center w-10 h-10 rounded-full border-2 ${step.id < currentStep ? "bg-primary border-primary text-white" : step.id === currentStep ? "border-primary text-primary" : "border-gray-300 text-gray-300"}`,
            children: step.id < currentStep ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx("span", { children: step.id })
          }
        ),
        /* @__PURE__ */ jsx("p", { className: `mt-2 text-sm ${step.id <= currentStep ? "text-primary font-medium" : "text-gray-500"}`, children: step.name })
      ] }, step.id)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 hidden sm:flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 h-1", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "bg-primary h-1 transition-all duration-300",
          style: { width: `${(currentStep - 1) / (totalSteps - 1) * 100}%` }
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "sm:hidden", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-primary", children: [
        "ขั้นตอนที่ ",
        currentStep,
        " จาก ",
        totalSteps,
        ": ",
        steps[currentStep - 1].name
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 w-full bg-gray-200 h-2 rounded-full", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "bg-primary h-2 rounded-full transition-all duration-300",
          style: { width: `${currentStep / totalSteps * 100}%` }
        }
      ) })
    ] })
  ] });
}
function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    businessCategory: "",
    taxId: "",
    profession: "",
    licenseNumber: "",
    address: "",
    province: "",
    district: "",
    subdistrict: "",
    postalCode: "",
    useMainAddress: false,
    mailingAddress: "",
    mailingProvince: "",
    mailingDistrict: "",
    mailingSubdistrict: "",
    mailingPostalCode: "",
    phone: "",
    email: "",
    lineId: "",
    referralSource: "",
    idCard: null,
    businessLicense: null,
    professionalLicense: null,
    acceptTerms: false
  });
  const totalSteps = 4;
  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setCurrentStep(totalSteps + 1);
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
    currentStep <= totalSteps && /* @__PURE__ */ jsx(FormProgress, { currentStep, totalSteps }),
    /* @__PURE__ */ jsx(Card, { className: "mt-6", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      currentStep === 1 && /* @__PURE__ */ jsx(BusinessInfoForm, { formData, updateFormData, nextStep }),
      currentStep === 2 && /* @__PURE__ */ jsx(
        AddressForm,
        {
          formData,
          updateFormData,
          nextStep,
          prevStep
        }
      ),
      currentStep === 3 && /* @__PURE__ */ jsx(
        ContactForm,
        {
          formData,
          updateFormData,
          nextStep,
          prevStep
        }
      ),
      currentStep === 4 && /* @__PURE__ */ jsx(
        DocumentsForm,
        {
          formData,
          updateFormData,
          prevStep,
          onSubmit: handleSubmit
        }
      ),
      currentStep === 5 && /* @__PURE__ */ jsx(RegistrationComplete, {})
    ] }) }) })
  ] });
}
function RegisterPage() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-gray-50 py-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("img", { src: "/ServeMedLogo.avif", alt: "ServeMed Logo", className: "h-16 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-primary", children: "สมัครสมาชิกสำหรับสถานประกอบการ" })
    ] }),
    /* @__PURE__ */ jsx(RegistrationForm, {})
  ] }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RegisterPage
}, Symbol.toStringTag, { value: "Module" }));
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
function useProductImages(productId) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchImages() {
      try {
        const mockImages = [
          {
            imageId: 1,
            productId,
            imageUrl: "/placeholder.svg?height=600&width=600",
            altText: "Product front view",
            displayOrder: 0,
            isThumbnail: true
          },
          {
            imageId: 2,
            productId,
            imageUrl: "/placeholder.svg?height=600&width=600&text=Side",
            altText: "Product side view",
            displayOrder: 1,
            isThumbnail: false
          },
          {
            imageId: 3,
            productId,
            imageUrl: "/placeholder.svg?height=600&width=600&text=Back",
            altText: "Product back view",
            displayOrder: 2,
            isThumbnail: false
          },
          {
            imageId: 4,
            productId,
            imageUrl: "/placeholder.svg?height=600&width=600&text=Detail",
            altText: "Product detail view",
            displayOrder: 3,
            isThumbnail: false
          }
        ];
        const sortedImages = mockImages.sort((a, b) => a.displayOrder - b.displayOrder);
        setImages(sortedImages);
      } catch (error) {
        console.error("Error fetching product images:", error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [productId]);
  return { images, isLoading };
}
function ProductGallery({ productId }) {
  const { images, isLoading } = useProductImages(productId);
  const [currentImage, setCurrentImage] = useState(0);
  if (isLoading || images.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "relative aspect-square bg-muted rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Loading images..." }) }) });
  }
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-square bg-white rounded-lg overflow-hidden border", children: [
      /* @__PURE__ */ jsxs(Dialog, { children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm",
            children: [
              /* @__PURE__ */ jsx(Expand, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Zoom" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(DialogContent, { className: "max-w-4xl", children: /* @__PURE__ */ jsx("div", { className: "relative aspect-square", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: images[currentImage].imageUrl || "/placeholder.svg?height=800&width=800",
            alt: images[currentImage].altText || "Product image",
            className: "object-contain",
            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: images[currentImage].imageUrl || "/placeholder.svg?height=600&width=600",
          alt: images[currentImage].altText || "Product image",
          className: "object-contain",
          sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
      ),
      images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm",
            onClick: prevImage,
            children: [
              /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous image" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm",
            onClick: nextImage,
            children: [
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next image" })
            ]
          }
        )
      ] })
    ] }),
    images.length > 1 && /* @__PURE__ */ jsx("div", { className: "flex space-x-2 overflow-x-auto pb-2", children: images.map((image, index) => /* @__PURE__ */ jsx(
      Button,
      {
        className: cn(
          "relative w-20 h-20 rounded-md overflow-hidden border-2",
          currentImage === index ? "border-primary" : "border-muted"
        ),
        onClick: () => setCurrentImage(index),
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: image.imageUrl || "/placeholder.svg?height=80&width=80",
            alt: image.altText || `Product thumbnail ${index + 1}`,
            className: "object-cover"
          }
        )
      },
      image.imageId
    )) })
  ] });
}
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
function useProductVariants(productId) {
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchVariants() {
      try {
        const mockVariants = [
          {
            variantId: 1,
            productId,
            packageDescription: "60 Capsules",
            price: 19.99,
            currency: "USD",
            listPrice: 24.99,
            servingSize: "1 Capsule",
            servingsPerContainer: 60,
            isInStock: true
          },
          {
            variantId: 2,
            productId,
            packageDescription: "120 Capsules",
            price: 34.99,
            currency: "USD",
            listPrice: 39.99,
            servingSize: "1 Capsule",
            servingsPerContainer: 120,
            isInStock: true
          },
          {
            variantId: 3,
            productId,
            packageDescription: "180 Capsules",
            price: 49.99,
            currency: "USD",
            listPrice: 59.99,
            servingSize: "1 Capsule",
            servingsPerContainer: 180,
            isInStock: false
          }
        ];
        setVariants(mockVariants);
      } catch (error) {
        console.error("Error fetching product variants:", error);
        setVariants([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVariants();
  }, [productId]);
  return { variants, isLoading };
}
function formatCurrency(value, currency = "THB", locale = "th-TH") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}
function ProductInfo({ product }) {
  var _a;
  const { variants, isLoading } = useProductVariants(product.productId);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    var _a2;
    if (!selectedVariant) {
      toast("Please select a product variant");
      return;
    }
    toast(`${product.name} (${(_a2 = variants.find((v) => v.variantId.toString() === selectedVariant)) == null ? void 0 : _a2.packageDescription}) x ${quantity}`);
  };
  const handleBuyNow = () => {
    if (!selectedVariant) {
      toast("Please select a product variant");
      return;
    }
    toast("This would navigate to the checkout page in a real app");
  };
  const currentVariant = selectedVariant ? variants.find((v) => v.variantId.toString() === selectedVariant) : variants[0];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: `/brands/${product.brandId}`,
          className: "text-sm font-medium text-muted-foreground hover:text-primary",
          children: product.brandName
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mt-1", children: product.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((star) => (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: `h-5 w-5 ${star <= Math.round(product.overallRating ? +product.overallRating : 0) ? "fill-primary" : "fill-muted stroke-muted-foreground"}`,
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" })
          },
          star
        )
      )) }),
      /* @__PURE__ */ jsxs(Link, { to: "#reviews", className: "text-sm text-muted-foreground hover:text-primary", children: [
        product.overallRating ? (_a = +product.overallRating) == null ? void 0 : _a.toFixed(1) : "0.0",
        " (",
        product.totalReviews || 0,
        " reviews)"
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "#questions", className: "text-sm text-muted-foreground hover:text-primary", children: [
        product.totalQuestions || 0,
        " questions"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      product.isuraVerified && /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 border-green-500 text-green-700", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "h-3 w-3" }),
          "Isura Verified"
        ] }) }),
        /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { className: "max-w-xs", children: "This product has been verified by Isura for quality and purity." }) })
      ] }) }),
      product.nonGmoDocumentation && /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "h-3 w-3" }),
        "Non-GMO"
      ] }),
      product.massSpecLabTested && /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Award, { className: "h-3 w-3" }),
        "Lab Tested"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold", children: currentVariant ? formatCurrency(currentVariant.price, currentVariant.currency) : "Select a variant" }),
        (currentVariant == null ? void 0 : currentVariant.listPrice) && currentVariant.price < currentVariant.listPrice && /* @__PURE__ */ jsx("span", { className: "text-lg text-muted-foreground line-through", children: formatCurrency(currentVariant.listPrice, currentVariant.currency) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "variant", children: "Package Size" }),
          isLoading && /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Loading variants..." })
        ] }),
        !isLoading && variants.length > 0 && /* @__PURE__ */ jsx(
          RadioGroup,
          {
            id: "variant",
            value: selectedVariant || variants[0].variantId.toString(),
            onValueChange: setSelectedVariant,
            className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
            children: variants.map((variant) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                RadioGroupItem,
                {
                  value: variant.variantId.toString(),
                  id: `variant-${variant.variantId}`,
                  className: "peer sr-only"
                }
              ),
              /* @__PURE__ */ jsxs(
                Label,
                {
                  htmlFor: `variant-${variant.variantId}`,
                  className: "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: variant.packageDescription }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: formatCurrency(variant.price, variant.currency) })
                  ]
                }
              )
            ] }, variant.variantId))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "quantity", children: "Quantity:" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            id: "quantity",
            value: quantity,
            onChange: (e) => setQuantity(Number.parseInt(e.target.value)),
            className: "rounded-md border border-input bg-background px-3 py-2",
            children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => /* @__PURE__ */ jsx("option", { value: num, children: num }, num))
          }
        )
      ] })
    ] }),
    currentVariant && /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: currentVariant.isInStock ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-600" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600 font-medium", children: "In Stock" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 text-red-500" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-red-500 font-medium", children: "Out of Stock" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          size: "lg",
          className: "flex-1",
          onClick: handleAddToCart,
          disabled: !(currentVariant == null ? void 0 : currentVariant.isInStock),
          children: [
            /* @__PURE__ */ jsx(ShoppingCart, { className: "mr-2 h-5 w-5" }),
            "Add to Cart"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "lg",
          variant: "secondary",
          className: "flex-1",
          onClick: handleBuyNow,
          disabled: !(currentVariant == null ? void 0 : currentVariant.isInStock),
          children: "Buy Now"
        }
      ),
      /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "outline", className: "sm:flex-none", children: [
        /* @__PURE__ */ jsx(Heart, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Add to Wishlist" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Product Highlights" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
        product.baseDescription && /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { children: product.baseDescription })
        ] }),
        (currentVariant == null ? void 0 : currentVariant.servingSize) && /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsx(Info, { className: "h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Serving Size: ",
            currentVariant.servingSize
          ] })
        ] }),
        (currentVariant == null ? void 0 : currentVariant.servingsPerContainer) && /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsx(Info, { className: "h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Servings Per Container: ",
            currentVariant.servingsPerContainer
          ] })
        ] })
      ] })
    ] })
  ] });
}
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
function ProductOverview({ product }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Product Description" }),
      /* @__PURE__ */ jsx("div", { className: "prose max-w-none", children: product.detailedDescription ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: product.detailedDescription } })
      ) : /* @__PURE__ */ jsx("p", { children: product.baseDescription || "This premium health supplement is designed to support your overall wellness. Made with high-quality ingredients and manufactured to the highest standards." }) })
    ] }) }),
    product.suggestedUse && /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Suggested Use" }),
      /* @__PURE__ */ jsx("div", { className: "prose max-w-none", children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: product.suggestedUse } }) })
    ] }) }),
    product.warnings && /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Warnings" }),
      /* @__PURE__ */ jsx("div", { className: "prose max-w-none", children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: product.warnings } }) })
    ] }) }),
    product.disclaimer && /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Disclaimer" }),
      /* @__PURE__ */ jsx("div", { className: "prose max-w-none", children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: product.disclaimer } }) })
    ] }) }),
    !product.suggestedUse && !product.warnings && !product.disclaimer && !product.detailedDescription && /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-center py-8", children: "Additional product information coming soon." })
  ] });
}
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
function ProductIngredients({ product }) {
  const getNutritionFacts = () => {
    return [
      { name: "Vitamin C", amount: "500mg", dailyValue: "556%" },
      { name: "Zinc", amount: "15mg", dailyValue: "136%" },
      { name: "Vitamin D3", amount: "50mcg", dailyValue: "250%" }
    ];
  };
  const nutritionFacts = getNutritionFacts();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Nutrition Facts" }),
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Ingredient" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Amount Per Serving" }),
          /* @__PURE__ */ jsx(TableHead, { children: "% Daily Value" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: nutritionFacts.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: item.name }),
            /* @__PURE__ */ jsx(TableCell, { children: item.amount }),
            /* @__PURE__ */ jsx(TableCell, { children: item.dailyValue })
          ] }, index)
        )) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "* Percent Daily Values are based on a 2,000 calorie diet." })
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Other Ingredients" }),
      product.otherIngredients ? /* @__PURE__ */ jsx("div", { className: "prose max-w-none", children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: product.otherIngredients } }) }) : /* @__PURE__ */ jsx("p", { children: "No other ingredients information available." })
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Allergen Information" }),
      /* @__PURE__ */ jsxs(Alert, { children: [
        /* @__PURE__ */ jsx(Info, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx(AlertDescription, { children: "Contains no artificial colors, flavors or preservatives. Free from gluten, wheat, dairy, soy, and GMOs." })
      ] })
    ] })
  ] });
}
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
function useQuestions(productId) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const mockQuestions = [
          {
            questionId: 1,
            productId,
            userId: "user1",
            userName: "HealthEnthusiast",
            questionText: "Is this product suitable for vegetarians?",
            questionDate: "2023-05-15T10:30:00Z",
            upvotes: 12,
            downvotes: 1,
            answers: [
              {
                answerId: 101,
                questionId: 1,
                userId: "admin1",
                userName: "ServeMed Support",
                answerText: "Yes, this product is suitable for vegetarians. It contains no animal-derived ingredients.",
                answerDate: "2023-05-16T09:15:00Z",
                isBestAnswer: true,
                isVerifiedPurchase: false,
                isRewardedAnswer: false,
                upvotes: 8,
                downvotes: 0
              },
              {
                answerId: 102,
                questionId: 1,
                userId: "user2",
                userName: "VitaminLover",
                answerText: "I'm vegetarian and have been using it for months with no issues.",
                answerDate: "2023-05-17T14:22:00Z",
                isBestAnswer: false,
                isVerifiedPurchase: true,
                isRewardedAnswer: false,
                upvotes: 5,
                downvotes: 0
              }
            ]
          },
          {
            questionId: 2,
            productId,
            userId: "user3",
            userName: "NutritionSeeker",
            questionText: "How long does one bottle typically last?",
            questionDate: "2023-06-02T16:45:00Z",
            upvotes: 8,
            downvotes: 0,
            answers: [
              {
                answerId: 201,
                questionId: 2,
                userId: "admin1",
                userName: "ServeMed Support",
                answerText: "The 60 capsule bottle will last 2 months if taken as directed (1 capsule per day).",
                answerDate: "2023-06-03T10:30:00Z",
                isBestAnswer: true,
                isVerifiedPurchase: false,
                isRewardedAnswer: false,
                upvotes: 6,
                downvotes: 0
              }
            ]
          },
          {
            questionId: 3,
            productId,
            userId: "user4",
            userName: "WellnessJourney",
            questionText: "Does this need to be taken with food or can it be taken on an empty stomach?",
            questionDate: "2023-06-10T08:15:00Z",
            upvotes: 15,
            downvotes: 0,
            answers: [
              {
                answerId: 301,
                questionId: 3,
                userId: "user5",
                userName: "HealthPro",
                answerText: "I take mine with breakfast. The manufacturer recommends taking it with a meal for best absorption.",
                answerDate: "2023-06-10T12:45:00Z",
                isBestAnswer: false,
                isVerifiedPurchase: true,
                isRewardedAnswer: false,
                upvotes: 10,
                downvotes: 1
              },
              {
                answerId: 302,
                questionId: 3,
                userId: "admin1",
                userName: "ServeMed Support",
                answerText: "For optimal absorption, we recommend taking this supplement with a meal containing some fat.",
                answerDate: "2023-06-11T09:30:00Z",
                isBestAnswer: true,
                isVerifiedPurchase: false,
                isRewardedAnswer: false,
                upvotes: 12,
                downvotes: 0
              }
            ]
          }
        ];
        setQuestions(mockQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, [productId]);
  return { questions, isLoading };
}
function ProductQuestions({ productId }) {
  const { questions, isLoading } = useQuestions(productId);
  const [newQuestion, setNewQuestion] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) {
      toast("Question cannot be empty");
      return;
    }
    toast("Your question has been submitted for review.");
    setNewQuestion("");
  };
  const handleVote = (type, questionId) => {
    toast(`Your ${type} has been recorded.`);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: "Loading questions..." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Ask a Question" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(
          Textarea,
          {
            placeholder: "Have a question about this product? Ask here...",
            value: newQuestion,
            onChange: (e) => setNewQuestion(e.target.value),
            className: "min-h-[100px]"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { onClick: handleSubmitQuestion, children: "Submit Question" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Customer Questions" }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
          questions.length,
          " questions"
        ] })
      ] }),
      questions.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No questions yet. Be the first to ask a question!" }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: questions.map((question) => /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: question.userName || "Anonymous" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(question.questionDate), { addSuffix: true }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 w-8 p-0",
                onClick: () => handleVote("upvote", question.questionId),
                children: [
                  /* @__PURE__ */ jsx(ThumbsUp, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Upvote" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: question.upvotes }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 w-8 p-0",
                onClick: () => handleVote("downvote", question.questionId),
                children: [
                  /* @__PURE__ */ jsx(ThumbsDown, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Downvote" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: question.downvotes })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "pb-2", children: /* @__PURE__ */ jsx("p", { className: "font-medium", children: question.questionText }) }),
        /* @__PURE__ */ jsx(CardFooter, { className: "flex-col items-start pt-0", children: question.answers && question.answers.length > 0 && /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "flex items-center gap-1 mb-2",
              onClick: () => toggleQuestion(question.questionId),
              children: expandedQuestions[question.questionId] ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" }),
                "Hide ",
                question.answers.length,
                " ",
                question.answers.length === 1 ? "answer" : "answers"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }),
                "Show ",
                question.answers.length,
                " ",
                question.answers.length === 1 ? "answer" : "answers"
              ] })
            }
          ),
          expandedQuestions[question.questionId] && /* @__PURE__ */ jsx("div", { className: "space-y-3 mt-2 pl-4 border-l", children: question.answers.map((answer) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: answer.userName || "Anonymous" }),
              answer.isVerifiedPurchase && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: "Verified Purchase" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(answer.answerDate), { addSuffix: true }) })
            ] }),
            /* @__PURE__ */ jsx("p", { children: answer.answerText }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-6 w-6 p-0",
                  onClick: () => handleVote("upvote", answer.answerId),
                  children: [
                    /* @__PURE__ */ jsx(ThumbsUp, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Upvote" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs", children: answer.upvotes }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-6 w-6 p-0",
                  onClick: () => handleVote("downvote", answer.answerId),
                  children: [
                    /* @__PURE__ */ jsx(ThumbsDown, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Downvote" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs", children: answer.downvotes })
            ] })
          ] }, answer.answerId)) })
        ] }) })
      ] }, question.questionId)) })
    ] })
  ] });
}
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
function useReviews(productId) {
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [reviewHighlights, setReviewHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchReviews() {
      try {
        const mockReviews = [
          {
            reviewId: 1,
            productId,
            userId: "user1",
            userName: "HealthEnthusiast",
            rating: 5,
            reviewTitle: "Excellent product, highly recommend!",
            reviewText: "I've been using this for 3 months and have noticed a significant improvement in my energy levels. The quality is excellent and I appreciate that it's lab tested.",
            reviewDate: "2023-04-10T14:30:00Z",
            isVerifiedPurchase: true,
            isRewardedReview: false,
            helpfulVotes: 24,
            notHelpfulVotes: 2,
            reviewerLocation: "California, USA",
            images: [
              {
                reviewImageId: 101,
                reviewId: 1,
                imageUrl: "/placeholder.svg?height=200&width=200&text=Review+Image",
                altText: "Product bottle"
              }
            ]
          },
          {
            reviewId: 2,
            productId,
            userId: "user2",
            userName: "VitaminLover",
            rating: 4,
            reviewTitle: "Good quality but expensive",
            reviewText: "The product works well and I can feel the difference, but it's a bit pricey compared to similar supplements. Would still recommend though.",
            reviewDate: "2023-05-05T09:15:00Z",
            isVerifiedPurchase: true,
            isRewardedReview: false,
            helpfulVotes: 15,
            notHelpfulVotes: 3,
            reviewerLocation: "New York, USA"
          },
          {
            reviewId: 3,
            productId,
            userId: "user3",
            userName: "NutritionSeeker",
            rating: 5,
            reviewTitle: "Best supplement I've tried",
            reviewText: "After trying many different brands, this is by far the best. The quality is noticeable and I appreciate the transparent labeling and third-party testing.",
            reviewDate: "2023-05-20T16:45:00Z",
            isVerifiedPurchase: true,
            isRewardedReview: true,
            helpfulVotes: 32,
            notHelpfulVotes: 1,
            reviewerLocation: "Texas, USA",
            images: [
              {
                reviewImageId: 301,
                reviewId: 3,
                imageUrl: "/placeholder.svg?height=200&width=200&text=Review+Image+1",
                altText: "Product packaging"
              },
              {
                reviewImageId: 302,
                reviewId: 3,
                imageUrl: "/placeholder.svg?height=200&width=200&text=Review+Image+2",
                altText: "Product capsules"
              }
            ]
          },
          {
            reviewId: 4,
            productId,
            userId: "user4",
            userName: "WellnessJourney",
            rating: 3,
            reviewTitle: "Average results",
            reviewText: "I've been using this for a month and haven't noticed dramatic results yet. The capsules are easy to swallow though and don't have any aftertaste.",
            reviewDate: "2023-06-02T11:20:00Z",
            isVerifiedPurchase: true,
            isRewardedReview: false,
            helpfulVotes: 8,
            notHelpfulVotes: 2,
            reviewerLocation: "Florida, USA"
          },
          {
            reviewId: 5,
            productId,
            userId: "user5",
            userName: "HealthPro",
            rating: 5,
            reviewTitle: "Professional quality",
            reviewText: "As someone who works in the health industry, I'm very particular about supplements. This product meets all my criteria for quality and effectiveness. Highly recommended!",
            reviewDate: "2023-06-15T08:30:00Z",
            isVerifiedPurchase: true,
            isRewardedReview: false,
            helpfulVotes: 45,
            notHelpfulVotes: 3,
            reviewerLocation: "Washington, USA"
          }
        ];
        const totalReviews = mockReviews.length;
        const ratingSum = mockReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalReviews > 0 ? ratingSum / totalReviews : 0;
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        for (const review of mockReviews) {
          if (ratingCounts[review.rating] !== void 0) {
            ratingCounts[review.rating]++;
          }
        }
        const mockHighlights = [
          { highlightId: 1, highlightText: "Great for energy levels" },
          { highlightId: 2, highlightText: "High quality ingredients" },
          { highlightId: 3, highlightText: "Easy to swallow capsules" },
          { highlightId: 4, highlightText: "Noticeable results within weeks" }
        ];
        setReviews(mockReviews);
        setReviewStats({
          averageRating,
          totalReviews,
          ratingCounts
        });
        setReviewHighlights(mockHighlights);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, [productId]);
  return { reviews, reviewStats, reviewHighlights, isLoading };
}
function ProductReviews({ productId }) {
  const { reviews, reviewStats, isLoading } = useReviews(productId);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const filteredReviews = selectedRating ? reviews.filter((review) => review.rating === selectedRating) : reviews;
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-40 bg-muted animate-pulse rounded-lg" }),
      [1, 2, 3].map((i) => /* @__PURE__ */ jsxs(Card, { className: "animate-pulse", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "bg-muted h-16" }),
        /* @__PURE__ */ jsx(CardContent, { className: "bg-muted/50 h-24 mt-2" })
      ] }, i))
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold mb-2", children: reviewStats.averageRating.toFixed(1) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-2", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
          Star,
          {
            className: `h-5 w-5 ${star <= Math.round(reviewStats.averageRating) ? "fill-primary text-primary" : "text-muted-foreground"}`
          },
          star
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "Based on ",
          reviewStats.totalReviews,
          " reviews"
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(Card, { className: "md:col-span-2", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsx("div", { className: "space-y-2", children: [5, 4, 3, 2, 1].map((rating) => {
        const count = reviewStats.ratingCounts[rating] || 0;
        const percentage = reviewStats.totalReviews ? Math.round(count / reviewStats.totalReviews * 100) : 0;
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: selectedRating === rating ? "default" : "outline",
              size: "sm",
              className: "w-16",
              onClick: () => setSelectedRating(selectedRating === rating ? null : rating),
              children: [
                rating,
                " ",
                /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 ml-1" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(Progress, { value: percentage, className: "h-2 flex-1" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm w-12 text-right", children: count })
        ] }, rating);
      }) }) }) })
    ] }),
    reviewStats.highlights && reviewStats.highlights.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Review Highlights" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: reviewStats.highlights.map((highlight, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-sm py-1 px-3", children: highlight }, index)
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Customer Reviews" }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsx(Filter, { className: "h-4 w-4 mr-2" }),
        "Filter"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: filteredReviews.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: selectedRating ? `No ${selectedRating}-star reviews yet.` : "No reviews yet. Be the first to review this product!" }) : filteredReviews.map((review) => /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
            Star,
            {
              className: `h-4 w-4 ${star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`
            },
            star
          )) }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(review.reviewDate), { addSuffix: true }) })
        ] }),
        /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: review.reviewTitle || "Untitled Review" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm", children: review.reviewText }),
        review.images && review.images.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto pb-2", children: review.images.map((image, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          /* @__PURE__ */ jsxs(Dialog, { children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
              Button,
              {
                className: "relative h-16 w-16 rounded-md overflow-hidden border flex-shrink-0",
                onClick: () => setSelectedImage(image.imageUrl),
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: image.imageUrl || "/placeholder.svg?height=64&width=64",
                    alt: image.altText || `Review image ${index + 1}`,
                    className: "object-cover"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(DialogContent, { className: "max-w-3xl", children: /* @__PURE__ */ jsx("div", { className: "relative aspect-square", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: image.imageUrl || "/placeholder.svg?height=800&width=800",
                alt: image.altText || "Review image",
                className: "object-contain"
              }
            ) }) })
          ] }, index)
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs", children: [
            review.isVerifiedPurchase && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "mr-2", children: "Verified Purchase" }),
            review.reviewerLocation && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: review.reviewerLocation })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", children: [
              /* @__PURE__ */ jsx(ThumbsUp, { className: "h-3 w-3 mr-1" }),
              review.helpfulVotes
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", children: [
              /* @__PURE__ */ jsx(ThumbsDown, { className: "h-3 w-3 mr-1" }),
              review.notHelpfulVotes
            ] })
          ] })
        ] })
      ] })
    ] }, review.reviewId)) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-4", children: /* @__PURE__ */ jsx(Button, { children: "Write a Review" }) })
  ] });
}
function ProductTabs({ productId, product }) {
  const [activeTab, setActiveTab] = useState("overview");
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "overview", value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [
    /* @__PURE__ */ jsxs(TabsList, { className: "grid grid-cols-4 mb-8", children: [
      /* @__PURE__ */ jsx(TabsTrigger, { value: "overview", children: "Overview" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "ingredients", children: "Ingredients" }),
      /* @__PURE__ */ jsxs(TabsTrigger, { value: "questions", children: [
        "Questions (",
        product.totalQuestions || 0,
        ")"
      ] }),
      /* @__PURE__ */ jsxs(TabsTrigger, { value: "reviews", children: [
        "Reviews (",
        product.totalReviews || 0,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx(TabsContent, { value: "overview", children: /* @__PURE__ */ jsx(ProductOverview, { product }) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "ingredients", children: /* @__PURE__ */ jsx(ProductIngredients, { product }) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "questions", children: /* @__PURE__ */ jsx(ProductQuestions, { productId }) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "reviews", children: /* @__PURE__ */ jsx(ProductReviews, { productId }) })
  ] });
}
function ProductCard({ product }) {
  const imageUrl = product.imageUrl || "/placeholder.svg?height=300&width=300";
  const price = product.price || 29.99;
  const currency = product.currency || "USD";
  const rating = product.overallRating || 4.5;
  const reviews = product.totalReviews || 0;
  return /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden transition-all hover:shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden", children: [
      /* @__PURE__ */ jsx(Link, { to: `/products/${product.productId}`, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: imageUrl,
          alt: product.name,
          className: "object-cover transition-transform hover:scale-105"
        }
      ) }),
      product.isuraVerified && /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "absolute top-2 right-2", children: "Verified" })
    ] }),
    /* @__PURE__ */ jsxs(CardHeader, { className: "p-4 pb-0", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: product.brandName || "Brand" }),
      /* @__PURE__ */ jsx(Link, { to: `/products/${product.productId}`, className: "hover:underline", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold line-clamp-2 h-12", children: product.name }) })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "p-4 pt-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1 mb-2", children: [
        Array(5).fill(0).map((_, i) => /* @__PURE__ */ jsx(
          Star,
          {
            className: `h-4 w-4 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}`
          },
          i
        )),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
          "(",
          reviews,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "font-bold", children: [
        currency === "USD" ? "$" : currency,
        " ",
        price.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { className: "p-4 pt-0", children: /* @__PURE__ */ jsxs(Button, { className: "w-full", size: "sm", children: [
      /* @__PURE__ */ jsx(ShoppingCart, { className: "h-4 w-4 mr-2" }),
      "Add to Cart"
    ] }) })
  ] });
}
function RelatedProducts({ productId, products }) {
  if (products.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No related products found." });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: products.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.productId)) });
}
function RelatedCategories({ productId, categories }) {
  if (categories.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-4 text-muted-foreground", children: "No categories found." });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((category) => /* @__PURE__ */ jsx(Link, { to: `/categories/${category.categoryId}`, children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-sm py-1.5 px-3 hover:bg-muted", children: category.name }) }, category.categoryId)) });
}
async function getTopCategories() {
  try {
    return [
      { categoryId: 1, name: "Vitamins", productCount: 120 },
      { categoryId: 2, name: "Minerals", productCount: 85 },
      { categoryId: 3, name: "Probiotics", productCount: 64 },
      { categoryId: 4, name: "Omega-3", productCount: 42 },
      { categoryId: 5, name: "Protein", productCount: 78 },
      { categoryId: 6, name: "Herbs", productCount: 93 }
    ];
  } catch (error) {
    console.error("Error fetching top categories:", error);
    return [];
  }
}
async function getProductCategories(productId) {
  try {
    return [
      { categoryId: 1, name: "Vitamins", productCount: 120 },
      { categoryId: 2, name: "Minerals", productCount: 85 },
      { categoryId: 3, name: "Probiotics", productCount: 64 },
      { categoryId: 4, name: "Omega-3", productCount: 42 },
      { categoryId: 5, name: "Protein", productCount: 78 },
      { categoryId: 6, name: "Herbs", productCount: 93 }
    ];
  } catch (error) {
    console.error("Error fetching top categories:", error);
    return [];
  }
}
async function getFeaturedProducts() {
  try {
    return [
      {
        productId: 1,
        name: "Vitamin D3 + K2 Complex",
        brandId: 1,
        brandName: "NutriPure",
        overallRating: 4.8,
        totalReviews: 128,
        price: 24.99,
        currency: "USD",
        isuraVerified: true
      },
      {
        productId: 2,
        name: "Omega-3 Fish Oil 1000mg",
        brandId: 2,
        brandName: "VitalLife",
        overallRating: 4.6,
        totalReviews: 95,
        price: 19.99,
        currency: "USD",
        isuraVerified: true
      },
      {
        productId: 3,
        name: "Probiotic 50 Billion CFU",
        brandId: 3,
        brandName: "BioBalance",
        overallRating: 4.7,
        totalReviews: 112,
        price: 29.99,
        currency: "USD",
        isuraVerified: false
      },
      {
        productId: 4,
        name: "Magnesium Glycinate",
        brandId: 1,
        brandName: "NutriPure",
        overallRating: 4.9,
        totalReviews: 87,
        price: 18.99,
        currency: "USD",
        isuraVerified: true
      }
    ];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
async function getRelatedProducts(productId) {
  try {
    return [
      {
        productId: 1,
        name: "Vitamin D3 + K2 Complex",
        brandId: 1,
        brandName: "NutriPure",
        overallRating: 4.8,
        totalReviews: 128,
        price: 24.99,
        currency: "USD",
        isuraVerified: true
      },
      {
        productId: 2,
        name: "Omega-3 Fish Oil 1000mg",
        brandId: 2,
        brandName: "VitalLife",
        overallRating: 4.6,
        totalReviews: 95,
        price: 19.99,
        currency: "USD",
        isuraVerified: true
      },
      {
        productId: 3,
        name: "Probiotic 50 Billion CFU",
        brandId: 3,
        brandName: "BioBalance",
        overallRating: 4.7,
        totalReviews: 112,
        price: 29.99,
        currency: "USD",
        isuraVerified: false
      },
      {
        productId: 4,
        name: "Magnesium Glycinate",
        brandId: 1,
        brandName: "NutriPure",
        overallRating: 4.9,
        totalReviews: 87,
        price: 18.99,
        currency: "USD",
        isuraVerified: true
      }
    ];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
async function getFeaturedBrands() {
  try {
    return [
      { brandId: 1, name: "NutriPure" },
      { brandId: 2, name: "VitalLife" },
      { brandId: 3, name: "BioBalance" },
      { brandId: 4, name: "PureEssentials" },
      { brandId: 5, name: "NatureWay" },
      { brandId: 6, name: "OptimalHealth" }
    ];
  } catch (error) {
    console.error("Error fetching featured brands:", error);
    return [];
  }
}
async function getTopRankedProducts() {
  try {
    return [
      {
        productId: 5,
        name: "Turmeric Curcumin with BioPerine",
        brandId: 4,
        brandName: "PureEssentials",
        overallRating: 4.9,
        totalReviews: 156,
        price: 22.99,
        currency: "USD",
        isuraVerified: true
      },
      {
        productId: 6,
        name: "Zinc Picolinate 50mg",
        brandId: 5,
        brandName: "NatureWay",
        overallRating: 4.7,
        totalReviews: 78,
        price: 14.99,
        currency: "USD",
        isuraVerified: false
      },
      {
        productId: 7,
        name: "Vitamin B Complex",
        brandId: 6,
        brandName: "OptimalHealth",
        overallRating: 4.8,
        totalReviews: 92,
        price: 21.99,
        currency: "USD",
        isuraVerified: true
      },
      {
        productId: 8,
        name: "Ashwagandha KSM-66",
        brandId: 3,
        brandName: "BioBalance",
        overallRating: 4.6,
        totalReviews: 104,
        price: 27.99,
        currency: "USD",
        isuraVerified: true
      }
    ];
  } catch (error) {
    console.error("Error fetching top ranked products:", error);
    return [];
  }
}
async function getNewArrivals() {
  try {
    return [
      {
        productId: 9,
        name: "Collagen Peptides Powder",
        brandId: 2,
        brandName: "VitalLife",
        overallRating: 4.5,
        totalReviews: 42,
        price: 34.99,
        currency: "USD",
        isuraVerified: true
      },
      {
        productId: 10,
        name: "Quercetin with Bromelain",
        brandId: 1,
        brandName: "NutriPure",
        overallRating: 4.7,
        totalReviews: 28,
        price: 26.99,
        currency: "USD",
        isuraVerified: false
      },
      {
        productId: 11,
        name: "Berberine HCl 500mg",
        brandId: 5,
        brandName: "NatureWay",
        overallRating: 4.8,
        totalReviews: 36,
        price: 29.99,
        currency: "USD",
        isuraVerified: true
      },
      {
        productId: 12,
        name: "Lion's Mane Mushroom Extract",
        brandId: 6,
        brandName: "OptimalHealth",
        overallRating: 4.6,
        totalReviews: 31,
        price: 32.99,
        currency: "USD",
        isuraVerified: true
      }
    ];
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
}
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t bg-muted/40", children: /* @__PURE__ */ jsxs("div", { className: "container px-4 py-12 md:py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "ServeMed" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Premium health supplements for your wellness journey." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsxs(Link, { to: "#", className: "text-muted-foreground hover:text-foreground", children: [
            /* @__PURE__ */ jsx("img", { height: "20", width: "20", alt: "icon brand", src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/facebook.svg" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Facebook" })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "#", className: "text-muted-foreground hover:text-foreground", children: [
            /* @__PURE__ */ jsx("img", { height: "20", width: "20", alt: "icon brand", src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/instagram.svg" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Instagram" })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "#", className: "text-muted-foreground hover:text-foreground", children: [
            /* @__PURE__ */ jsx("img", { height: "20", width: "20", alt: "icon brand", src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/x.svg" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "X" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold", children: "Shop" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/products", className: "text-muted-foreground hover:text-foreground", children: "All Products" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/categories", className: "text-muted-foreground hover:text-foreground", children: "Categories" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/brands", className: "text-muted-foreground hover:text-foreground", children: "Brands" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/new-arrivals", className: "text-muted-foreground hover:text-foreground", children: "New Arrivals" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold", children: "Company" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-muted-foreground hover:text-foreground", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "text-muted-foreground hover:text-foreground", children: "Contact" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/careers", className: "text-muted-foreground hover:text-foreground", children: "Careers" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog", className: "text-muted-foreground hover:text-foreground", children: "Blog" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold", children: "Customer Service" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/help", className: "text-muted-foreground hover:text-foreground", children: "Help Center" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/shipping", className: "text-muted-foreground hover:text-foreground", children: "Shipping Information" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/returns", className: "text-muted-foreground hover:text-foreground", children: "Returns & Refunds" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/faq", className: "text-muted-foreground hover:text-foreground", children: "FAQ" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ServeMed. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "hover:text-foreground", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx(Link, { to: "/terms", className: "hover:text-foreground", children: "Terms of Service" }),
        /* @__PURE__ */ jsx(Link, { to: "/cookies", className: "hover:text-foreground", children: "Cookie Policy" })
      ] })
    ] }) })
  ] }) });
}
const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetPortal = DialogPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "container flex h-16 items-center", children: [
    /* @__PURE__ */ jsxs(Sheet, { children: [
      /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "md:hidden", children: [
        /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle menu" })
      ] }) }),
      /* @__PURE__ */ jsx(SheetContent, { side: "left", className: "w-[300px] sm:w-[400px]", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-4 mt-8", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "text-lg font-semibold", children: "Home" }),
        /* @__PURE__ */ jsx(Link, { to: "/products", className: "text-lg font-semibold", children: "Products" }),
        /* @__PURE__ */ jsx(Link, { to: "/categories", className: "text-lg font-semibold", children: "Categories" }),
        /* @__PURE__ */ jsx(Link, { to: "/brands", className: "text-lg font-semibold", children: "Brands" }),
        /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-lg font-semibold", children: "About Us" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "text-lg font-semibold", children: "Contact" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mr-6 flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: "hidden font-bold sm:inline-block text-xl", children: "ServeMed" }) }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-6 text-sm", children: [
      /* @__PURE__ */ jsx(Link, { to: "/products", className: "font-medium transition-colors hover:text-primary", children: "Products" }),
      /* @__PURE__ */ jsx(Link, { to: "/categories", className: "font-medium transition-colors hover:text-primary", children: "Categories" }),
      /* @__PURE__ */ jsx(Link, { to: "/brands", className: "font-medium transition-colors hover:text-primary", children: "Brands" }),
      /* @__PURE__ */ jsx(Link, { to: "/about", className: "font-medium transition-colors hover:text-primary", children: "About Us" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center ml-auto gap-2", children: [
      /* @__PURE__ */ jsx("form", { className: "hidden md:flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { type: "search", placeholder: "Search products...", className: "w-full md:w-[200px] lg:w-[300px] pl-8" })
      ] }) }),
      /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "md:hidden", children: [
        /* @__PURE__ */ jsx(Search, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Search" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
        /* @__PURE__ */ jsx(User, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Account" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [
        /* @__PURE__ */ jsx(ShoppingCart, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsx(Badge, { className: "absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0", children: "3" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Cart" })
      ] })
    ] })
  ] }) });
}
const Wrapper = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
class HttpClient {
  /**
   * Create a new HTTP client.
   *
   * @param baseURL - The base URL for your API endpoints.
   * @param unauthorizedHandler - Optional callback triggered on 401 responses.
   * @param defaultConfig - Additional default config for axios.
   */
  constructor(baseURL, unauthorizedHandler, defaultConfig) {
    __publicField(this, "axiosInstance");
    /**
     * A function to be called when a 401 Unauthorized error is encountered.
     * By default, it will simply redirect the browser to `/auth/sign-in` (if running
     * in the browser).
     */
    __publicField(this, "unauthorizedHandler");
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      ...defaultConfig
    });
    this.unauthorizedHandler = unauthorizedHandler || (() => {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/sign-in";
      }
    });
  }
  /**
   * Helper to build authorization and custom signature headers.
   */
  buildHeaders(options) {
    const headers = {};
    if (options == null ? void 0 : options.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }
    if (options == null ? void 0 : options.signature) {
      headers["x-internal-signature"] = options.signature;
    }
    return headers;
  }
  /**
   * Common request handler for non-stream requests.
   */
  async handleRequest(config) {
    try {
      const response = await this.axiosInstance.request(config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  /**
   * A specialized handler for streaming responses.
   */
  async handleStreamRequest(config) {
    try {
      const response = await this.axiosInstance.request(config);
      let filename = "downloaded-file.pdf";
      const contentDisposition = response.headers["content-disposition"] || response.headers["Content-Disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match == null ? void 0 : match[1]) {
          filename = match[1];
        }
      }
      return { data: response.data, filename };
    } catch (error) {
      throw this.handleError(error);
    }
  }
  /**
   * Handle errors from axios.
   */
  handleError(error) {
    var _a;
    if (axios.isAxiosError(error)) {
      console.error("HTTP Client encountered an Axios error:", error);
      const status = (_a = error.response) == null ? void 0 : _a.status;
      if (status === HttpStatusCode.Unauthorized && typeof window !== "undefined") {
        this.unauthorizedHandler();
      }
      return error;
    }
    return new Error(
      (error == null ? void 0 : error.message) || "An unknown error occurred"
    );
  }
  /**
   * Perform a GET request.
   *
   * @param url         The endpoint URL (relative or absolute).
   * @param options     (Optional) Token, signature, an AbortSignal, and extra headers.
   * @param config      (Optional) Additional axios config options.
   */
  get(url, options, config) {
    return this.handleRequest({
      method: "GET",
      url,
      signal: options == null ? void 0 : options.signal,
      headers: {
        ...this.buildHeaders(options),
        ...options == null ? void 0 : options.headers
      },
      ...config
    });
  }
  /**
   * Perform a POST request.
   */
  post(url, data, options, config) {
    return this.handleRequest({
      method: "POST",
      url,
      data,
      signal: options == null ? void 0 : options.signal,
      headers: {
        ...this.buildHeaders(options),
        ...options == null ? void 0 : options.headers
      },
      ...config
    });
  }
  /**
   * Perform a PUT request.
   */
  put(url, data, options, config) {
    return this.handleRequest({
      method: "PUT",
      url,
      data,
      signal: options == null ? void 0 : options.signal,
      headers: {
        ...this.buildHeaders(options),
        ...options == null ? void 0 : options.headers
      },
      ...config
    });
  }
  /**
   * Perform a DELETE request.
   */
  delete(url, options, config) {
    return this.handleRequest({
      method: "DELETE",
      url,
      signal: options == null ? void 0 : options.signal,
      headers: {
        ...this.buildHeaders(options),
        ...options == null ? void 0 : options.headers
      },
      ...config
    });
  }
  /**
   * Perform a GET request that returns a stream (for binary data).
   *
   * @param url         The endpoint URL.
   * @param options     (Optional) Token, AbortSignal, headers, and responseType.
   * @param config      (Optional) Additional axios config options.
   */
  stream(url, options, config) {
    return this.handleStreamRequest({
      method: "GET",
      url,
      responseType: (options == null ? void 0 : options.responseType) || "arraybuffer",
      signal: options == null ? void 0 : options.signal,
      headers: {
        "Cache-Control": "no-store",
        // Prevent caching issues
        ...this.buildHeaders(options),
        ...options == null ? void 0 : options.headers
      },
      ...config
    });
  }
  /**
   * A generic request method for more advanced scenarios.
   */
  request(config, options) {
    config.headers = { ...this.buildHeaders(options), ...config.headers };
    return this.handleRequest(config);
  }
}
const API_ENDPOINT = {
  // Product Endpoint
  PRODUCT_V1_DETAIL: "/api/v1/products/details/:id",
  // Compose Endpoint
  COMPOSE_V1_HOME: "/api/v1/compose/home"
};
function validateQuery(q) {
  for (const [key, value] of Object.entries(q)) {
    if (value === void 0 || value === null) {
      delete q[key];
    } else if (Array.isArray(value)) {
      q[key] = value.join(",");
    }
  }
  return true;
}
class UrlBuilder {
  /**
   * Constructs the UrlBuilder.
   *
   * @param root - The key for the base URL (default is "BACKEND_ENDPOINT").
   * @param path - The key to lookup in API_ENDPOINT.
   *
   * @throws Error if the base URL or API endpoint is not found.
   */
  constructor({
    root = "PUBLIC_API_URL",
    path
  }) {
    __publicField(this, "baseUrl");
    __publicField(this, "urlPath");
    __publicField(this, "queryParams");
    var _a, _b, _c;
    let base = "";
    if (typeof process !== "undefined" && process.env) {
      base = process.env[root] || "";
    } else if (typeof window !== "undefined") {
      base = ((_a = window.ENV) == null ? void 0 : _a[root]) || ((_c = (_b = window.ENV) == null ? void 0 : _b.env) == null ? void 0 : _c[root]) || "";
    }
    if (!base) {
      throw new Error(`Base URL is not defined for root: ${root}`);
    }
    this.baseUrl = base;
    const endpoint = API_ENDPOINT[path];
    if (!endpoint) {
      throw new Error(`API endpoint is not defined for path: ${path}`);
    }
    this.urlPath = endpoint;
    this.queryParams = new URLSearchParams();
  }
  /**
   * Replaces a URL parameter placeholder with a value.
   * Use placeholders in your endpoints like ":id".
   *
   * @param key - The key to replace.
   * @param value - The value to substitute.
   *
   * @returns The UrlBuilder instance for chaining.
   */
  param(key, value) {
    const regex = new RegExp(`:${key}(?=/|$)`);
    this.urlPath = this.urlPath.replace(regex, encodeURIComponent(String(value)));
    return this;
  }
  /**
   * Appends query parameters to the URL.
   *
   * @param query - A record of query parameters.
   *
   * @returns The UrlBuilder instance for chaining.
   */
  query(query) {
    if (!query) return this;
    if (validateQuery(query)) {
      for (const [key, value] of Object.entries(query)) {
        if (value == null) continue;
        if (Array.isArray(value)) {
          for (const v of value) {
            this.queryParams.append(key, v);
          }
        } else {
          this.queryParams.set(key, value);
        }
      }
    }
    return this;
  }
  /**
   * Builds the final URL, including the base, path, and query parameters.
   *
   * @returns The constructed URL as UrlBuilded.
   */
  build() {
    let url = this.baseUrl + this.urlPath;
    const queryString = this.queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    return url;
  }
}
const getProductById = async (productId) => {
  try {
    const url = new UrlBuilder({ path: "PRODUCT_V1_DETAIL" }).param("id", productId).build();
    const response = await new HttpClient(url).get();
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};
async function loader$1({ params }) {
  const productId = Number.parseInt(params.id);
  const product = await getProductById(productId);
  const [relatedProducts, relatedCategories] = await Promise.all([
    getRelatedProducts(),
    getProductCategories()
  ]);
  return { product, productId, relatedProducts, relatedCategories };
}
const meta = ({ data }) => {
  if (!(data == null ? void 0 : data.product)) {
    return [
      { title: "Product Not Found" },
      { name: "description", content: "The requested product could not be found." }
    ];
  }
  return [
    { title: `${data.product.name} | ServeMed` },
    {
      name: "description",
      content: data.product.detailedDescription || "Premium health supplement from ServeMed"
    }
  ];
};
function ProductPage() {
  const { product, productId, relatedProducts, relatedCategories } = useLoaderData();
  if (!product) {
    return /* @__PURE__ */ jsx(Wrapper, { children: /* @__PURE__ */ jsx("div", { className: "container px-4 py-8 mx-auto", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-96 w-full" }) }) });
  }
  return /* @__PURE__ */ jsx(Wrapper, { children: /* @__PURE__ */ jsxs("div", { className: "container px-4 py-8 mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12", children: [
      /* @__PURE__ */ jsx(ProductGallery, { productId }),
      /* @__PURE__ */ jsx(ProductInfo, { product })
    ] }),
    /* @__PURE__ */ jsx(ProductTabs, { productId, product }),
    /* @__PURE__ */ jsxs("section", { className: "my-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6", children: "Related Products" }),
      /* @__PURE__ */ jsx(RelatedProducts, { productId, products: relatedProducts })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "my-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6", children: "Related Categories" }),
      /* @__PURE__ */ jsx(RelatedCategories, { productId, categories: relatedCategories })
    ] })
  ] }) });
}
function ErrorBoundary() {
  return /* @__PURE__ */ jsxs("div", { className: "container px-4 py-8 mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Product Not Found" }),
    /* @__PURE__ */ jsx("p", { children: "The requested product could not be found." })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: ProductPage,
  loader: loader$1,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function HeroSection() {
  return /* @__PURE__ */ jsxs("section", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-green-50 to-teal-50 z-0" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4", children: "Premium Health Supplements" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-md", children: "Discover lab-tested, high-quality supplements to support your health and wellness journey." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/products", children: [
            "Shop Now ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/categories", children: "Browse Categories" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 pt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex -space-x-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full border-2 border-background overflow-hidden", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/placeholder.svg?height=32&width=32",
              alt: "Customer",
              width: 32,
              height: 32,
              className: "h-full w-full object-cover"
            }
          ) }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "500+" }),
            " happy customers"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 pt-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
            "svg",
            {
              role: "img",
              "aria-label": "product",
              className: "h-5 w-5 fill-primary",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" })
            },
            star
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "4.9/5" }),
            " from verified reviews"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/placeholder.svg?height=800&width=600",
            alt: "Featured supplements",
            className: "object-cover"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[200px]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-md overflow-hidden", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/placeholder.svg?height=48&width=48",
              alt: "Featured product",
              width: 48,
              height: 48,
              className: "h-full w-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Best Seller" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Vitamin Complex" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "bg-green-100 p-2 rounded-full", children: /* @__PURE__ */ jsx(
          "svg",
          {
            role: "img",
            "aria-label": "Floating verification badge ",
            className: "h-6 w-6 text-green-600",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })
          }
        ) }) })
      ] })
    ] }) })
  ] });
}
function CategoryCard({ category }) {
  const imageUrl = category.imageUrl || "/placeholder.svg?height=96&width=96";
  return /* @__PURE__ */ jsxs(Link, { to: `/categories/${category.categoryId}`, className: "flex flex-col items-center text-center group", children: [
    /* @__PURE__ */ jsx("div", { className: "h-24 w-24 rounded-full overflow-hidden mb-3 bg-white p-2 shadow-sm transition-all group-hover:shadow-md", children: /* @__PURE__ */ jsx("div", { className: "relative h-full w-full rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: imageUrl,
        alt: category.name,
        className: "object-cover transition-transform group-hover:scale-110"
      }
    ) }) }),
    /* @__PURE__ */ jsx("h3", { className: "font-medium text-sm", children: category.name }),
    category.productCount !== void 0 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
      category.productCount,
      " products"
    ] })
  ] });
}
function BrandCard({ brand }) {
  const logoUrl = brand.logoUrl || "/placeholder.svg?height=80&width=160";
  return /* @__PURE__ */ jsx(Link, { to: `/brands/${brand.brandId}`, children: /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden transition-all hover:shadow-md border-muted/50", children: [
    /* @__PURE__ */ jsx("div", { className: "h-24 flex items-center justify-center p-4 bg-white", children: /* @__PURE__ */ jsx("div", { className: "relative h-16 w-full", children: /* @__PURE__ */ jsx("img", { src: logoUrl, alt: brand.name, className: "object-contain" }) }) }),
    /* @__PURE__ */ jsx(CardContent, { className: "p-3 bg-muted/10", children: /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-center truncate", children: brand.name }) })
  ] }) });
}
function HomePage() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsx(Wrapper, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col min-h-screen", children: /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx("section", { className: "py-12 px-4 md:px-6 lg:px-8 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Shop by Category" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "Browse our wide selection of health supplements" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/categories", className: "flex items-center text-primary hover:underline", children: [
          "View all categories ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(TopCategories, { categories: data.topCategories })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 px-4 md:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Featured Products" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "Our most popular health supplements" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/products", className: "flex items-center text-primary hover:underline", children: [
          "View all products ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(ProductSkeleton, {}), children: /* @__PURE__ */ jsx(FeaturedProducts, { products: data.featuredProducts }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 px-4 md:px-6 lg:px-8 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Top Brands" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "Trusted manufacturers of quality supplements" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/brands", className: "flex items-center text-primary hover:underline", children: [
          "View all brands ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(BrandSkeleton, {}), children: /* @__PURE__ */ jsx(FeaturedBrands, { brands: data.featuredBrands }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 px-4 md:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Top Ranked Products" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "Highest rated in their categories" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/rankings", className: "flex items-center text-primary hover:underline", children: [
          "View all rankings ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(ProductSkeleton, {}), children: /* @__PURE__ */ jsx(TopRankedProducts, { products: data.topRankedProducts }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 px-4 md:px-6 lg:px-8 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "New Arrivals" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "The latest additions to our catalog" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/new-arrivals", className: "flex items-center text-primary hover:underline", children: [
          "View all new arrivals ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(ProductSkeleton, {}), children: /* @__PURE__ */ jsx(NewArrivals, { products: data.newArrivals }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 px-4 md:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center p-6 border rounded-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-3 rounded-full mb-4", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "Quality Guaranteed" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "All products are lab-tested and verified for quality and purity" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center p-6 border rounded-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-3 rounded-full mb-4", children: /* @__PURE__ */ jsx(Star, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "Expert Selection" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Curated by health professionals to ensure effectiveness" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center p-6 border rounded-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-primary/10 p-3 rounded-full mb-4", children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "Trending Products" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Stay ahead with the latest and most effective supplements" })
      ] })
    ] }) }) })
  ] }) }) });
}
async function loader({ request }) {
  const [
    featuredProducts,
    topCategories,
    featuredBrands,
    topRankedProducts,
    newArrivals
  ] = await Promise.all([
    getFeaturedProducts(),
    getTopCategories(),
    getFeaturedBrands(),
    getTopRankedProducts(),
    getNewArrivals()
  ]);
  const url = new UrlBuilder({ path: "COMPOSE_V1_HOME" }).build();
  const httpClient = await new HttpClient(url).get("");
  console.log(httpClient);
  return httpClient.data;
}
function TopCategories({ categories: categories2 }) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", children: categories2.map((category) => /* @__PURE__ */ jsx(CategoryCard, { category }, category.categoryId)) });
}
function FeaturedProducts({ products: products2 }) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: products2.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.productId)) });
}
function FeaturedBrands({ brands }) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6", children: brands.map((brand) => /* @__PURE__ */ jsx(BrandCard, { brand }, brand.brandId)) });
}
function TopRankedProducts({ products: products2 }) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: products2.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.productId)) });
}
function NewArrivals({ products: products2 }) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: products2.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.productId)) });
}
function ProductSkeleton() {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: Array(4).fill(0).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-48 w-full" }),
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24 mb-2" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-full" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full mb-2" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-2/3" })
      ] }),
      /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }) })
    ] }, i)
  )) });
}
function BrandSkeleton() {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6", children: Array(6).fill(0).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-24 w-full" }),
      /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }) })
    ] }, i)
  )) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BafHXwgH.js", "imports": ["/assets/components-6Be9zFHv.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-BTmRvvAg.js", "imports": ["/assets/components-6Be9zFHv.js"], "css": ["/assets/root-CDop6B2Z.css"] }, "routes/register._index": { "id": "routes/register._index", "parentId": "root", "path": "register", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/register._index-XFhCy166.js", "imports": ["/assets/components-6Be9zFHv.js", "/assets/index-DXxRMCu1.js", "/assets/circle-check-big-eDFoZTfU.js"], "css": [] }, "routes/products.$id": { "id": "routes/products.$id", "parentId": "root", "path": "products/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/products._id-CfHTY1qK.js", "imports": ["/assets/components-6Be9zFHv.js", "/assets/index-DXxRMCu1.js", "/assets/Wrapper-avUBIu7H.js", "/assets/circle-check-big-eDFoZTfU.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-8NPD_EMA.js", "imports": ["/assets/components-6Be9zFHv.js", "/assets/index-DXxRMCu1.js", "/assets/Wrapper-avUBIu7H.js"], "css": [] } }, "url": "/assets/manifest-22dd77dc.js", "version": "22dd77dc" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/register._index": {
    id: "routes/register._index",
    parentId: "root",
    path: "register",
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/products.$id": {
    id: "routes/products.$id",
    parentId: "root",
    path: "products/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
