# PART 9 / 20
# PRODUCT DATABASE & CMS DATA ARCHITECTURE
# ============================================================

Progress

██████████████████████░░░░░░░░░░░░░░░░░░ 45%

This website must NOT hardcode products.

Every product should be generated dynamically from a structured database.

Whether the website contains

20 products

100 products

500 products

the design should never change.

Only the product data changes.

====================================================

CMS STRUCTURE

====================================================

Products

↓

Categories

↓

Specifications

↓

Features

↓

Accessories

↓

Downloads

↓

Images

↓

Applications

↓

SEO

↓

Related Products

====================================================

DATABASE STRUCTURE

====================================================

Every product should contain the following information.

----------------------------------------------------

Basic Information

----------------------------------------------------

Product ID

Product Name

Model Number

Brand

Category

Sub Category

Series

Launch Year

Status

Featured

New Arrival

Best Seller

Availability

Slug

----------------------------------------------------

Short Description

----------------------------------------------------

Maximum

150 Characters

Displayed on

Cards

Category Pages

Related Products

Search Results

----------------------------------------------------

Long Description

----------------------------------------------------

Displayed only on

Product Page

Should explain

Purpose

Applications

Advantages

Build Quality

Performance

====================================================

SPECIFICATIONS

====================================================

Every specification should be dynamic.

Example

Engine Type

Displacement

Power

RPM

Fuel Tank Capacity

Fuel Mixture

Starting System

Weight

Dimensions

Handle Type

Gearbox

Blade Size

Cutting Width

Noise Level

Operating Time

Warranty

Country of Origin

====================================================

FEATURES

====================================================

Every feature should contain

Feature Name

Description

Image

Icon

Display Order

Example

Japanese Carburetor

Heavy Duty Gearbox

Fuel Efficient Engine

Comfort Handle

Professional Clutch

Low Vibration

Easy Starting

High Torque

====================================================

APPLICATIONS

====================================================

Each product should support multiple applications.

Agriculture

Tea Gardens

Commercial Farming

Forestry

Municipality

Roadside Maintenance

Plantation

Horticulture

Landscaping

Every application

contains

Name

Image

Description

====================================================

ACCESSORIES

====================================================

Accessories should be stored independently.

Products only reference them.

Accessory Database

Accessory Name

Accessory Image

Description

Compatible Models

Category

Example

Harness

Nylon Head

Metal Blade

Circular Blade

Ridger Rod

Router Blade

Cultivator

Safety Kit

Tool Kit

Oil Mixing Bottle

Spark Plug

Extension Shaft

====================================================

IMAGE DATABASE

====================================================

Every product should support unlimited images.

Hero Image

Studio Image

Front View

Rear View

Side View

Engine Close-up

Gearbox Close-up

Handle

Blade

Application Images

Accessory Images

Packaging

====================================================

DOWNLOADS

====================================================

Every product supports

Catalogue PDF

Instruction Manual

Warranty Guide

Exploded Diagram

Technical Sheet

Safety Manual

Future

Parts Catalogue

====================================================

VIDEOS

====================================================

Support

YouTube

MP4

360° Video

Demo Video

Maintenance Video

Assembly Video

====================================================

RELATED PRODUCTS

====================================================

Every product can have

Related Products

Compatible Accessories

Upgrade Models

Replacement Models

====================================================

SEO

====================================================

Every product

Meta Title

Meta Description

Keywords

Canonical URL

Open Graph Image

Schema.org Product Data

====================================================

PRODUCT STATUS

====================================================

Featured

Popular

Best Seller

New Arrival

Coming Soon

Discontinued

====================================================

PRODUCT CATEGORIES

====================================================

The catalogue should be divided into structured categories.

Primary Categories

Brush Cutters

Tillers

Chainsaws

Tea Harvesters

Power Sprayers

Pressure Washers

Water Pumps

Earth Augers

Hedge Trimmers

Accessories

Replacement Parts

====================================================

BRUSH CUTTERS

====================================================

Models

X1-260

X1-330

X1-430

X1-5200

X1-6200

Backpack Brush Cutter

(Verify final list from official catalogue before production.)

====================================================

CHAINSAWS

====================================================

Models

X1-5800

X1-6200

X1-6258

====================================================

TILLERS

====================================================

Mini Tiller

Power Tiller

Intercultivator

Rotary Weeder

====================================================

TEA HARVESTERS

====================================================

Single Blade

Double Blade

Professional Tea Harvester

====================================================

POWER SPRAYERS

====================================================

Battery Sprayers

Engine Sprayers

Knapsack Sprayers

Portable Sprayers

====================================================

PRESSURE WASHERS

====================================================

Portable Washer

Professional Pressure Washer

Car Washer

Foam Gun

====================================================

WATER PUMPS

====================================================

Aluminium Pumps

Petrol Water Pumps

Transfer Pumps

====================================================

EARTH AUGERS

====================================================

Earth Auger

Auger Bits

====================================================

ACCESSORIES

====================================================

Harness

Nylon Head

Metal Blade

Router Blade

Ridger Rod

Tool Kit

Safety Goggles

Gloves

Oil Bottle

Mixing Bottle

Circular Blade

Cultivator

Extension Shaft

Spark Plug

Gearbox

Fuel Filter

====================================================

IMPORTANT NOTE

====================================================

Before development begins,

the ENTIRE Bushra Impex catalogue must be digitised.

Every product must be entered into structured JSON/CMS format.

No product information should remain embedded inside PDFs.

The catalogue should become the source of truth for all product pages.

Future product additions should require only data entry, not code changes.

====================================================

CMS REQUIREMENTS

====================================================

The admin should be able to:

✓ Add new products

✓ Edit specifications

✓ Replace images

✓ Add accessories

✓ Upload brochures

✓ Add videos

✓ Mark products as featured

✓ Publish/unpublish products

✓ Change category

✓ Update SEO

without requiring any developer.

====================================================

FUTURE SCALABILITY

====================================================

The CMS architecture should support:

Unlimited categories

Unlimited products

Unlimited accessories

Multiple brands

Multi-language support

Dealer-specific pricing (future)

Distributor portal (future)

Spare parts catalogue (future)

Warranty registration (future)

Product registration (future)

Online quotation system (future)

# ============================================================